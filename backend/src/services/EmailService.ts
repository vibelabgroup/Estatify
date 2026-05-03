import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';
import { config } from '../config';
import { logger } from '../utils/logger';

const prisma = new PrismaClient();

export interface SMTPAccount {
  email: string;
  password: string;
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
  trackingId?: string;
  metadata?: Record<string, any>;
}

export interface SendResult {
  success: boolean;
  messageId?: string;
  smtpAccount?: string;
  error?: string;
}

export class EmailService {
  private accounts: SMTPAccount[];
  private currentAccountIndex = 0;
  private dailyLimits: Map<string, { count: number; date: string }> = new Map();

  constructor() {
    this.accounts = config.smtpAccounts;
    this.initializeDailyLimits();
  }

  private initializeDailyLimits() {
    const today = new Date().toISOString().split('T')[0];
    this.accounts.forEach((account) => {
      this.dailyLimits.set(account.email, { count: 0, date: today });
    });
  }

  private async checkDailyLimit(account: SMTPAccount): Promise<boolean> {
    const today = new Date().toISOString().split('T')[0];
    const limit = this.dailyLimits.get(account.email);
    
    if (!limit || limit.date !== today) {
      return true;
    }
    
    return limit.count < config.dailyEmailLimit;
  }

  private async incrementDailyCount(account: SMTPAccount) {
    const today = new Date().toISOString().split('T')[0];
    const limit = this.dailyLimits.get(account.email);
    
    if (!limit || limit.date !== today) {
      this.dailyLimits.set(account.email, { count: 1, date: today });
      
      await prisma.dailyEmailLimit.upsert({
        where: {
          account_date: {
            account: account.email,
            date: new Date(today),
          },
        },
        create: {
          account: account.email,
          date: new Date(today),
          sentCount: 1,
          limit: config.dailyEmailLimit,
          resetAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
        update: {
          sentCount: { increment: 1 },
        },
      });
    } else {
      this.dailyLimits.set(account.email, { count: limit.count + 1, date: today });
      
      await prisma.dailyEmailLimit.update({
        where: {
          account_date: {
            account: account.email,
            date: new Date(today),
          },
        },
        data: {
          sentCount: { increment: 1 },
        },
      });
    }
  }

  private async getAvailableAccount(): Promise<SMTPAccount | null> {
    for (let i = 0; i < this.accounts.length; i++) {
      const account = this.accounts[this.currentAccountIndex];
      this.currentAccountIndex = (this.currentAccountIndex + 1) % this.accounts.length;

      const canSend = await this.checkDailyLimit(account);
      if (canSend) {
        return account;
      }
    }
    return null;
  }

  private createTransporter(account: SMTPAccount) {
    return nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: config.smtpSecure,
      auth: {
        user: account.email,
        pass: account.password,
      },
    });
  }

  async sendEmail(options: EmailOptions): Promise<SendResult> {
    try {
      const account = await this.getAvailableAccount();
      if (!account) {
        return {
          success: false,
          error: 'No SMTP accounts available - daily limits reached',
        };
      }

      const transporter = this.createTransporter(account);
      
      const html = this.wrapLinks(options.html, options.trackingId);
      
      const mailOptions = {
        from: options.from || config.emailFrom,
        to: options.to,
        subject: options.subject,
        html,
        text: options.text,
        replyTo: options.replyTo,
      };

      const result = await transporter.sendMail(mailOptions);
      
      await this.incrementDailyCount(account);

      return {
        success: true,
        messageId: result.messageId,
        smtpAccount: account.email,
      };
    } catch (error: any) {
      logger.error('Failed to send email', { error, options });
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async sendBulkEmails(emails: EmailOptions[]): Promise<SendResult[]> {
    const results: SendResult[] = [];
    const delay = 1000 / config.emailRateLimit;

    for (const email of emails) {
      const result = await this.sendEmail(email);
      results.push(result);
      
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    return results;
  }

  async getDailyStats(): Promise<
    Array<{ account: string; sent: number; limit: number; remaining: number }>
  > {
    const today = new Date().toISOString().split('T')[0];

    const stats = await Promise.all(
      this.accounts.map(async (account) => {
        const limit = this.dailyLimits.get(account.email);
        const sent = limit?.date === today ? limit.count : 0;
        const remaining = Math.max(0, config.dailyEmailLimit - sent);

        return {
          account: account.email,
          sent,
          limit: config.dailyEmailLimit,
          remaining,
        };
      })
    );

    return stats;
  }

  async testConnection(account: SMTPAccount): Promise<boolean> {
    try {
      const transporter = this.createTransporter(account);
      await transporter.verify();
      return true;
    } catch (error: any) {
      logger.error('SMTP connection test failed', { account: account.email, error });
      return false;
    }
  }

  async testAllConnections(): Promise<
    Array<{ account: string; success: boolean; error?: string }>
  > {
    const results = await Promise.all(
      this.accounts.map(async (account) => {
        const success = await this.testConnection(account);
        return {
          account: account.email,
          success,
          error: success ? undefined : 'Connection failed',
        };
      })
    );

    return results;
  }

  private wrapLinks(html: string, trackingId?: string): string {
    if (!trackingId) return html;

    return html.replace(
      /<a\s+(?:[^>]*?\s+)?href="([^"]*)"/g,
      (_match, url) => {
        const trackingUrl = `${config.frontendUrl}/api/track/click?id=${trackingId}&url=${encodeURIComponent(url)}`;
        return `<a href="${trackingUrl}"`;
      }
    );
  }
}

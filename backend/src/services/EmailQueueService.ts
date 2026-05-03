import Queue, { Job, JobOptions } from 'bull';
import { config } from '../config';
import { logger } from '../utils/logger';
import { EmailService } from './EmailService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface EmailJobData {
  emailLogId: string;
  to: string;
  subject: string;
  html: string;
  text?: string;
  trackingId?: string;
  metadata?: Record<string, any>;
}

export class EmailQueueService {
  private emailQueue: Queue.Queue<EmailJobData>;
  private emailService: EmailService;

  constructor() {
    this.emailQueue = new Queue('email-sending', config.redisUrl, {
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 5000,
        },
        removeOnComplete: {
          count: 1000,
          age: 24 * 3600,
        },
        removeOnFail: {
          count: 5000,
          age: 7 * 24 * 3600,
        },
      },
    });

    this.emailService = new EmailService();
    this.setupProcessors();
    this.setupEventListeners();
  }

  private setupProcessors() {
    this.emailQueue.process('send-email', async (job: Job<EmailJobData>) => {
      const { emailLogId, to, subject, html, text, trackingId, metadata } = job.data;

      logger.info('Processing email job', { emailLogId, to });

      await prisma.emailLog.update({
        where: { id: emailLogId },
        data: { status: 'queued' },
      });

      const result = await this.emailService.sendEmail({
        to,
        subject,
        html,
        text,
        trackingId,
        metadata,
      });

      if (result.success) {
        await prisma.emailLog.update({
          where: { id: emailLogId },
          data: {
            status: 'sent',
            messageId: result.messageId,
            sentAt: new Date(),
            smtpAccount: result.smtpAccount,
          },
        });

        logger.info('Email sent successfully', { emailLogId, messageId: result.messageId });
      } else {
        await prisma.emailLog.update({
          where: { id: emailLogId },
          data: {
            status: 'failed',
            metadata: JSON.stringify({
              ...metadata,
              error: result.error,
            }),
          },
        });

        logger.error('Email send failed', { emailLogId, error: result.error });
        throw new Error(result.error);
      }
    });
  }

  private setupEventListeners() {
    this.emailQueue.on('completed', (job: Job) => {
      logger.info('Email job completed', { jobId: job.id });
    });

    this.emailQueue.on('failed', (job: Job | undefined, error: Error) => {
      logger.error('Email job failed', { jobId: job?.id, error: error.message });
    });

    this.emailQueue.on('stalled', (job: Job) => {
      logger.warn('Email job stalled', { jobId: job.id });
    });
  }

  async addEmailJob(data: EmailJobData, options?: JobOptions): Promise<Job<EmailJobData>> {
    return this.emailQueue.add('send-email', data, {
      ...options,
      removeOnComplete: 1000,
      removeOnFail: 5000,
    });
  }

  async addBulkEmailJobs(
    jobs: Array<{ data: EmailJobData; options?: JobOptions }>
  ): Promise<Job<EmailJobData>[]> {
    return this.emailQueue.addBulk(
      jobs.map((job) => ({
        name: 'send-email',
        data: job.data,
        opts: job.options,
      }))
    );
  }

  async getQueueStats() {
    const waiting = await this.emailQueue.getWaitingCount();
    const active = await this.emailQueue.getActiveCount();
    const completed = await this.emailQueue.getCompletedCount();
    const failed = await this.emailQueue.getFailedCount();
    const delayed = await this.emailQueue.getDelayedCount();

    return {
      waiting,
      active,
      completed,
      failed,
      delayed,
    };
  }

  async pauseQueue() {
    await this.emailQueue.pause();
    logger.info('Email queue paused');
  }

  async resumeQueue() {
    await this.emailQueue.resume();
    logger.info('Email queue resumed');
  }

  async cleanQueue() {
    await this.emailQueue.clean(0, 'completed' as any);
    await this.emailQueue.clean(0, 'failed' as any);
    logger.info('Email queue cleaned');
  }
}

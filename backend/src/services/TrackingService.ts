import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';
import { AppError } from '../middleware/errorHandler';
import { FollowupService } from './FollowupService';

const prisma = new PrismaClient();

export class TrackingService {
  private followupService: FollowupService;

  constructor() {
    this.followupService = new FollowupService();
  }

  async trackOpen(emailLogId: string, ip: string, userAgent: string) {
    try {
      const emailLog = await prisma.emailLog.findUnique({
        where: { id: emailLogId },
        include: { lead: true },
      });

      if (!emailLog) {
        throw new AppError(404, 'Email log not found');
      }

      await prisma.emailLog.update({
        where: { id: emailLogId },
        data: {
          status: 'opened',
          openedAt: new Date(),
        },
      });

      await prisma.trackingEvent.create({
        data: {
          emailLogId,
          eventType: 'open',
          ipAddress: ip,
          userAgent,
        },
      });

      await prisma.lead.update({
        where: { id: emailLog.leadId },
        data: {
          lastContactAt: new Date(),
          status: 'responded',
        },
      });

      await this.followupService.checkTrigger(emailLogId, 'opened');

      logger.info('Email open tracked', { emailLogId, ip });

      return this.getTrackingPixel();
    } catch (error) {
      logger.error('Failed to track email open', { emailLogId, error });
      return this.getTrackingPixel();
    }
  }

  async trackClick(emailLogId: string, url: string, ip: string, userAgent: string) {
    try {
      const emailLog = await prisma.emailLog.findUnique({
        where: { id: emailLogId },
        include: { lead: true },
      });

      if (!emailLog) {
        throw new AppError(404, 'Email log not found');
      }

      await prisma.emailLog.update({
        where: { id: emailLogId },
        data: {
          status: 'clicked',
          clickedAt: new Date(),
        },
      });

      await prisma.trackingEvent.create({
        data: {
          emailLogId,
          eventType: 'click',
          eventData: JSON.stringify({ url }),
          ipAddress: ip,
          userAgent,
        },
      });

      await prisma.lead.update({
        where: { id: emailLog.leadId },
        data: {
          lastContactAt: new Date(),
          status: 'responded',
        },
      });

      await this.followupService.checkTrigger(emailLogId, 'clicked');

      logger.info('Email click tracked', { emailLogId, url, ip });

      return url;
    } catch (error) {
      logger.error('Failed to track email click', { emailLogId, error });
      return url;
    }
  }

  async trackBounce(emailLogId: string, reason: string) {
    try {
      await prisma.emailLog.update({
        where: { id: emailLogId },
        data: {
          status: 'bounced',
          bouncedAt: new Date(),
          bounceReason: reason,
        },
      });

      await prisma.trackingEvent.create({
        data: {
          emailLogId,
          eventType: 'bounce',
          eventData: JSON.stringify({ reason }),
        },
      });

      const emailLog = await prisma.emailLog.findUnique({
        where: { id: emailLogId },
      });

      if (emailLog) {
        await prisma.lead.update({
          where: { id: emailLog.leadId },
          data: { status: 'bounced' },
        });
      }

      logger.info('Email bounce tracked', { emailLogId, reason });
    } catch (error) {
      logger.error('Failed to track email bounce', { emailLogId, error });
    }
  }

  async trackUnsubscribe(emailLogId: string, ip: string) {
    try {
      const emailLog = await prisma.emailLog.findUnique({
        where: { id: emailLogId },
        include: { lead: true },
      });

      if (!emailLog) {
        throw new AppError(404, 'Email log not found');
      }

      await prisma.trackingEvent.create({
        data: {
          emailLogId,
          eventType: 'unsubscribe',
          ipAddress: ip,
        },
      });

      const lead = await prisma.lead.findUnique({
        where: { id: emailLog.leadId },
      });

      await prisma.lead.update({
        where: { id: emailLog.leadId },
        data: {
          tags: JSON.stringify([...new Set([...(JSON.parse(lead?.tags || '[]') as string[]), 'unsubscribed'])]),
        },
      });

      logger.info('Unsubscribe tracked', { emailLogId, ip });

      return { success: true, message: 'Unsubscribed successfully' };
    } catch (error) {
      logger.error('Failed to track unsubscribe', { emailLogId, error });
      throw error;
    }
  }

  private getTrackingPixel(): Buffer {
    const gif = Buffer.from(
      'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      'base64'
    );
    return gif;
  }

  async getTrackingStats(emailLogId: string) {
    const events = await prisma.trackingEvent.findMany({
      where: { emailLogId },
      orderBy: { timestamp: 'asc' },
    });

    const opens = events.filter((e: any) => e.eventType === 'open').length;
    const clicks = events.filter((e: any) => e.eventType === 'click').length;
    const bounces = events.filter((e: any) => e.eventType === 'bounce').length;
    const unsubscribes = events.filter((e: any) => e.eventType === 'unsubscribe').length;

    return {
      totalEvents: events.length,
      opens,
      clicks,
      bounces,
      unsubscribes,
      events,
    };
  }
}

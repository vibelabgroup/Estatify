import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

export interface GetLeadsOptions {
  page: number;
  limit: number;
  status?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  tags?: string[];
}

export class LeadService {
  constructor(private prisma: PrismaClient) {}
  async getLeads(options: GetLeadsOptions) {
    const { page, limit } = options;
    const skip = (page - 1) * limit;

    try {
      // Very simple query to isolate the issue
      const leads = await this.prisma.lead.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      });

      const total = await this.prisma.lead.count();

      return {
        leads,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async getLeadAnalytics(leadId: string) {
    const emailLogs = await this.prisma.emailLog.findMany({
      where: { leadId },
      orderBy: { createdAt: 'desc' },
      take: 100, // added this line
    });

    const sent = emailLogs.filter((log: any) => log.status === 'sent').length;
    const opened = emailLogs.filter((log: any) => log.status === 'opened').length;
    const clicked = emailLogs.filter((log: any) => log.status === 'clicked').length;
    const bounced = emailLogs.filter((log: any) => log.status === 'bounced').length;

    const trackingEvents = await this.prisma.trackingEvent.findMany({
      where: {
        emailLog: { leadId },
      },
    });

    const openEvents = trackingEvents.filter((e: any) => e.eventType === 'open').length;
    const clickEvents = trackingEvents.filter((e: any) => e.eventType === 'click').length;

    return {
      totalEmails: emailLogs.length,
      sent,
      opened,
      clicked,
      bounced,
      openRate: sent > 0 ? ((opened / sent) * 100).toFixed(2) : '0',
      clickRate: sent > 0 ? ((clicked / sent) * 100).toFixed(2) : '0',
      bounceRate: sent > 0 ? ((bounced / sent) * 100).toFixed(2) : '0',
      totalOpens: openEvents,
      totalClicks: clickEvents,
      lastActivity: emailLogs[0]?.createdAt || null,
    };
  }

  async assignSequence(leadId: string, sequenceId: string) {
    const lead = await this.prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!lead) {
      throw new AppError(404, 'Lead not found');
    }

    const sequence = await this.prisma.followupSequence.findUnique({
      where: { id: sequenceId },
    });

    if (!sequence) {
      throw new AppError(404, 'Sequence not found');
    }

    const existing = await this.prisma.leadSequence.findFirst({
      where: {
        leadId,
        sequenceId,
        status: 'active',
      },
    });

    if (existing) {
      throw new AppError(409, 'Lead already assigned to this sequence');
    }

    const assignment = await this.prisma.leadSequence.create({
      data: {
        leadId,
        sequenceId,
        currentStep: 0,
        status: 'active',
      },
      include: {
        sequence: true,
      },
    });

    return assignment;
  }
}

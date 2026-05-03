import { PrismaClient } from '@prisma/client';
import { EmailQueueService } from './EmailQueueService';
import { logger } from '../utils/logger';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();
const emailQueueService = new EmailQueueService();

export class FollowupService {
  async checkTrigger(emailLogId: string, event: string) {
    try {
      const emailLog = await prisma.emailLog.findUnique({
        where: { id: emailLogId },
        include: { lead: true },
      });

      if (!emailLog) {
        throw new AppError(404, 'Email log not found');
      }

      const leadSequences = await prisma.leadSequence.findMany({
        where: {
          leadId: emailLog.leadId,
          status: 'active',
        },
        include: {
          sequence: true,
        },
      });

      for (const leadSequence of leadSequences) {
        const sequence = leadSequence.sequence;

        if (sequence.triggerEvent === event) {
          await this.scheduleNextStep(
            emailLog.leadId,
            sequence.id,
            leadSequence.currentStep + 1
          );
        }
      }
    } catch (error) {
      logger.error('Failed to check followup trigger', { emailLogId, event, error });
    }
  }

  async scheduleNextStep(leadId: string, sequenceId: string, stepOrder: number) {
    try {
      const step = await prisma.followupStep.findFirst({
        where: {
          sequenceId,
          stepOrder,
        },
      });

      if (!step) {
        logger.info('No more steps in sequence', { leadId, sequenceId, stepOrder });
        
        await prisma.leadSequence.updateMany({
          where: {
            leadId,
            sequenceId,
            status: 'active',
          },
          data: {
            status: 'completed',
            completedAt: new Date(),
          },
        });
        return;
      }

      const delay = step.delayHours * 60 * 60 * 1000;

      const lead = await prisma.lead.findUnique({
        where: { id: leadId },
      });

      if (!lead) {
        throw new AppError(404, 'Lead not found');
      }

      const subject = this.personalizeContent(step.subject, lead);
      const html = this.personalizeContent(step.body, lead);

      const emailLog = await prisma.emailLog.create({
        data: {
          leadId,
          toEmail: lead.email,
          subject,
          status: 'pending',
          metadata: JSON.stringify({
            type: 'followup',
            sequenceId,
            stepOrder,
          }),
        },
      });

      await emailQueueService.addEmailJob(
        {
          emailLogId: emailLog.id,
          to: lead.email,
          subject,
          html,
          trackingId: emailLog.id,
          metadata: {
            type: 'followup',
            sequenceId,
            stepOrder,
          },
        },
        {
          delay,
        }
      );

      await prisma.leadSequence.updateMany({
        where: {
          leadId,
          sequenceId,
          status: 'active',
        },
        data: {
          currentStep: stepOrder,
        },
      });

      logger.info('Followup step scheduled', {
        leadId,
        sequenceId,
        stepOrder,
        delay: `${step.delayHours} hours`,
      });
    } catch (error) {
      logger.error('Failed to schedule followup step', { leadId, sequenceId, stepOrder, error });
    }
  }

  private personalizeContent(content: string, lead: any): string {
    let personalized = content;

    const variables: Record<string, string> = {
      '{{firstName}}': lead.firstName || 'there',
      '{{lastName}}': lead.lastName || '',
      '{{email}}': lead.email,
      '{{company}}': lead.company || '',
      '{{name}}': `${lead.firstName || ''} ${lead.lastName || ''}`.trim() || 'there',
    };

    for (const [key, value] of Object.entries(variables)) {
      personalized = personalized.replace(new RegExp(key, 'g'), value);
    }

    return personalized;
  }

  async createSequence(data: {
    name: string;
    description?: string;
    triggerEvent: string;
    triggerDelay: number;
    steps: Array<{ subject: string; body: string; delayHours: number }>;
  }) {
    const sequence = await prisma.followupSequence.create({
      data: {
        name: data.name,
        description: data.description,
        triggerEvent: data.triggerEvent,
        triggerDelay: data.triggerDelay,
        steps: {
          create: data.steps.map((step, index) => ({
            stepOrder: index,
            subject: step.subject,
            body: step.body,
            delayHours: step.delayHours,
          })),
        },
      },
      include: {
        steps: {
          orderBy: { stepOrder: 'asc' },
        },
      },
    });

    return sequence;
  }

  async updateSequence(id: string, data: any) {
    const sequence = await prisma.followupSequence.update({
      where: { id },
      data: {
        ...data,
        steps: data.steps
          ? {
              deleteMany: {},
              create: data.steps.map((step: any, index: number) => ({
                stepOrder: index,
                subject: step.subject,
                body: step.body,
                delayHours: step.delayHours,
              })),
            }
          : undefined,
      },
      include: {
        steps: {
          orderBy: { stepOrder: 'asc' },
        },
      },
    });

    return sequence;
  }

  async deleteSequence(id: string) {
    await prisma.followupSequence.delete({
      where: { id },
    });
  }

  async getSequences(filters: { isActive?: boolean } = {}) {
    return prisma.followupSequence.findMany({
      where: filters,
      include: {
        steps: {
          orderBy: { stepOrder: 'asc' },
        },
        _count: {
          select: {
            leadSequences: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async pauseSequenceForLead(leadId: string, sequenceId: string) {
    await prisma.leadSequence.updateMany({
      where: {
        leadId,
        sequenceId,
        status: 'active',
      },
      data: {
        status: 'paused',
      },
    });
  }

  async resumeSequenceForLead(leadId: string, sequenceId: string) {
    const leadSequence = await prisma.leadSequence.findFirst({
      where: {
        leadId,
        sequenceId,
        status: 'paused',
      },
    });

    if (leadSequence) {
      await prisma.leadSequence.update({
        where: { id: leadSequence.id },
        data: {
          status: 'active',
        },
      });

      await this.scheduleNextStep(leadId, sequenceId, leadSequence.currentStep);
    }
  }
}

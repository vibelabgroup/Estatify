import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { EmailService } from '../services/EmailService';
import { EmailQueueService } from '../services/EmailQueueService';
import Joi from 'joi';

const router = Router();
const prisma = new PrismaClient();
const emailService = new EmailService();
const emailQueueService = new EmailQueueService();

const sendEmailSchema = Joi.object({
  to: Joi.string().email().required(),
  subject: Joi.string().required(),
  html: Joi.string().required(),
  text: Joi.string(),
  trackingId: Joi.string(),
  metadata: Joi.object(),
});

const bulkEmailSchema = Joi.object({
  emails: Joi.array().items(
    Joi.object({
      to: Joi.string().email().required(),
      subject: Joi.string().required(),
      html: Joi.string().required(),
      text: Joi.string(),
      trackingId: Joi.string(),
      metadata: Joi.object(),
    })
  ).required(),
});

router.use(authMiddleware);

router.post('/send', validateRequest(sendEmailSchema), async (req: AuthRequest, res, next) => {
  try {
    const { to, subject, html, text, trackingId, metadata } = req.body;

    const emailLog = await prisma.emailLog.create({
      data: {
        leadId: metadata?.leadId || null,
        toEmail: to,
        subject,
        status: 'pending',
        metadata,
      },
    });

    const result = await emailService.sendEmail({
      to,
      subject,
      html,
      text,
      trackingId: trackingId || emailLog.id,
      metadata,
    });

    if (result.success) {
      await prisma.emailLog.update({
        where: { id: emailLog.id },
        data: {
          status: 'sent',
          messageId: result.messageId,
          sentAt: new Date(),
          smtpAccount: result.smtpAccount,
        },
      });
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/bulk', validateRequest(bulkEmailSchema), async (req: AuthRequest, res, next) => {
  try {
    const { emails } = req.body;

    const emailLogs = await Promise.all(
      emails.map((email: any) =>
        prisma.emailLog.create({
          data: {
            leadId: email.metadata?.leadId || null,
            toEmail: email.to,
            subject: email.subject,
            status: 'pending',
            metadata: email.metadata,
          },
        })
      )
    );

    const jobs = emailLogs.map((log, index) => ({
      data: {
        emailLogId: log.id,
        to: emails[index].to,
        subject: emails[index].subject,
        html: emails[index].html,
        text: emails[index].text,
        trackingId: emails[index].trackingId || log.id,
        metadata: emails[index].metadata,
      },
    }));

    const queuedJobs = await emailQueueService.addBulkEmailJobs(jobs);

    res.json({
      queued: queuedJobs.length,
      total: emails.length,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/queue/stats', async (_req: AuthRequest, res, next) => {
  try {
    const stats = await emailQueueService.getQueueStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

router.post('/queue/pause', async (_req: AuthRequest, res, next) => {
  try {
    await emailQueueService.pauseQueue();
    res.json({ message: 'Queue paused' });
  } catch (error) {
    next(error);
  }
});

router.post('/queue/resume', async (_req: AuthRequest, res, next) => {
  try {
    await emailQueueService.resumeQueue();
    res.json({ message: 'Queue resumed' });
  } catch (error) {
    next(error);
  }
});

router.post('/queue/clean', async (_req: AuthRequest, res, next) => {
  try {
    await emailQueueService.cleanQueue();
    res.json({ message: 'Queue cleaned' });
  } catch (error) {
    next(error);
  }
});

router.get('/stats/daily', async (_req: AuthRequest, res, next) => {
  try {
    const stats = await emailService.getDailyStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

router.get('/logs', async (req: AuthRequest, res, next) => {
  try {
    const { page = 1, limit = 20, status, leadId } = req.query;

    const where: any = {};
    if (status) where.status = status;
    if (leadId) where.leadId = leadId;

    const [logs, total] = await Promise.all([
      prisma.emailLog.findMany({
        where,
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          lead: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      }),
      prisma.emailLog.count({ where }),
    ]);

    res.json({
      logs,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;

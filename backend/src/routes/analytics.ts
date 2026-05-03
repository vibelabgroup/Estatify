import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

router.get('/overview', async (_req: AuthRequest, res, next) => {
  try {
    const [
      totalLeads,
      totalEmails,
      totalCampaigns,
      activeSequences,
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.emailLog.count(),
      prisma.emailCampaign.count(),
      prisma.followupSequence.count({ where: { isActive: true } }),
    ]);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [
      newLeads,
      sentEmails,
      openedEmails,
      clickedEmails,
    ] = await Promise.all([
      prisma.lead.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
      prisma.emailLog.count({ where: { sentAt: { gte: thirtyDaysAgo } } }),
      prisma.emailLog.count({ where: { openedAt: { gte: thirtyDaysAgo } } }),
      prisma.emailLog.count({ where: { clickedAt: { gte: thirtyDaysAgo } } }),
    ]);

    res.json({
      totalLeads,
      totalEmails,
      totalCampaigns,
      activeSequences,
      last30Days: {
        newLeads,
        sentEmails,
        openedEmails,
        clickedEmails,
        openRate: sentEmails > 0 ? ((openedEmails / sentEmails) * 100).toFixed(2) : '0',
        clickRate: sentEmails > 0 ? ((clickedEmails / sentEmails) * 100).toFixed(2) : '0',
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/leads-by-status', async (_req: AuthRequest, res, next) => {
  try {
    const leadsByStatus = await prisma.lead.groupBy({
      by: ['status'],
      _count: true,
    });

    res.json(
      leadsByStatus.map((item: any) => ({
        status: item.status,
        count: item._count,
      }))
    );
  } catch (error) {
    next(error);
  }
});

router.get('/email-stats', async (_req: AuthRequest, res, next) => {
  try {
    const emailStats = await prisma.emailLog.groupBy({
      by: ['status'],
      _count: true,
    });

    res.json(
      emailStats.map((item: any) => ({
        status: item.status,
        count: item._count,
      }))
    );
  } catch (error) {
    next(error);
  }
});

router.get('/daily-trends', async (req: AuthRequest, res, next) => {
  try {
    const { days = 30 } = req.query;
    const daysNum = Number(days);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysNum);

    const emailLogs = await prisma.emailLog.findMany({
      where: {
        sentAt: { gte: startDate },
      },
      select: {
        sentAt: true,
        status: true,
      },
    });

    const trends: Record<string, any> = {};

    emailLogs.forEach((log: any) => {
      const date = log.sentAt.toISOString().split('T')[0];
      if (!trends[date]) {
        trends[date] = { sent: 0, opened: 0, clicked: 0 };
      }
      trends[date].sent++;
      if (log.status === 'opened') trends[date].opened++;
      if (log.status === 'clicked') trends[date].clicked++;
    });

    res.json(trends);
  } catch (error) {
    next(error);
  }
});

export default router;

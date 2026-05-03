import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import Joi from 'joi';

const router = Router();
const prisma = new PrismaClient();

const createCampaignSchema = Joi.object({
  name: Joi.string().required(),
  subject: Joi.string().required(),
  body: Joi.string().required(),
  templateId: Joi.string(),
  scheduledFor: Joi.date(),
});

const updateCampaignSchema = Joi.object({
  name: Joi.string(),
  subject: Joi.string(),
  body: Joi.string(),
  status: Joi.string().valid('draft', 'scheduled', 'sending', 'sent', 'paused'),
  scheduledFor: Joi.date(),
});

router.use(authMiddleware);

router.get('/', async (_req: AuthRequest, res, next) => {
  try {
    const campaigns = await prisma.emailCampaign.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { emailLogs: true },
        },
      },
    });
    res.json(campaigns);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', async (req: AuthRequest, res, next) => {
  try {
    const campaign = await prisma.emailCampaign.findUnique({
      where: { id: req.params.id },
      include: {
        emailLogs: {
          take: 10,
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
        },
      },
    });

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    return res.json(campaign);
  } catch (error) {
    return next(error);
  }
});

router.post('/', validateRequest(createCampaignSchema), async (req: AuthRequest, res, next) => {
  try {
    const campaign = await prisma.emailCampaign.create({
      data: req.body,
    });
    res.status(201).json(campaign);
  } catch (error) {
    return next(error);
  }
});

router.put('/:id', validateRequest(updateCampaignSchema), async (req: AuthRequest, res, next) => {
  try {
    const campaign = await prisma.emailCampaign.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(campaign);
  } catch (error) {
    return next(error);
  }
});

router.delete('/:id', async (req: AuthRequest, res, next) => {
  try {
    await prisma.emailCampaign.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    return next(error);
  }
});

export default router;

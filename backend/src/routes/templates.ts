import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import Joi from 'joi';

const router = Router();
const prisma = new PrismaClient();

const createTemplateSchema = Joi.object({
  name: Joi.string().required(),
  subject: Joi.string().required(),
  body: Joi.string().required(),
  variables: Joi.array().items(Joi.string()),
  category: Joi.string(),
});

const updateTemplateSchema = Joi.object({
  name: Joi.string(),
  subject: Joi.string(),
  body: Joi.string(),
  variables: Joi.array().items(Joi.string()),
  category: Joi.string(),
  isActive: Joi.boolean(),
});

router.use(authMiddleware);

router.get('/', async (_req: AuthRequest, res, next) => {
  try {
    const { category, isActive } = _req.query;
    const where: any = {};
    if (category) where.category = category;
    if (isActive !== undefined) where.isActive = isActive === 'true';

    const templates = await prisma.emailTemplate.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    res.json(templates);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', async (req: AuthRequest, res, next) => {
  try {
    const template = await prisma.emailTemplate.findUnique({
      where: { id: req.params.id },
    });

    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    return res.json(template);
  } catch (error) {
    return next(error);
  }
});

router.post('/', validateRequest(createTemplateSchema), async (req: AuthRequest, res, next) => {
  try {
    const template = await prisma.emailTemplate.create({
      data: req.body,
    });
    res.status(201).json(template);
  } catch (error) {
    return next(error);
  }
});

router.put('/:id', validateRequest(updateTemplateSchema), async (req: AuthRequest, res, next) => {
  try {
    const template = await prisma.emailTemplate.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(template);
  } catch (error) {
    return next(error);
  }
});

router.delete('/:id', async (req: AuthRequest, res, next) => {
  try {
    await prisma.emailTemplate.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    return next(error);
  }
});

export default router;

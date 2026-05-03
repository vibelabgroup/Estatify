import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import Joi from 'joi';

const router = Router();
const prisma = new PrismaClient();

const updateSettingSchema = Joi.object({
  value: Joi.string().required(),
  type: Joi.string().valid('string', 'number', 'boolean', 'json'),
});

router.use(authMiddleware);

router.get('/', async (_req: AuthRequest, res, next) => {
  try {
    const { category } = _req.query;
    const where: any = {};
    if (category) where.category = category;

    const settings = await prisma.systemSetting.findMany({
      where,
      orderBy: { category: 'asc' },
    });
    res.json(settings);
  } catch (error) {
    return next(error);
  }
});

router.get('/:key', async (req: AuthRequest, res, next) => {
  try {
    const setting = await prisma.systemSetting.findUnique({
      where: { key: req.params.key },
    });

    if (!setting) {
      return res.status(404).json({ error: 'Setting not found' });
    }

    let parsedValue: any = setting.value;
    if (setting.type === 'number') {
      parsedValue = Number(setting.value);
    } else if (setting.type === 'boolean') {
      parsedValue = setting.value === 'true';
    } else if (setting.type === 'json') {
      parsedValue = JSON.parse(setting.value);
    }

    return res.json({
      key: setting.key,
      value: parsedValue,
      type: setting.type,
      category: setting.category,
      updatedAt: setting.updatedAt,
    });
  } catch (error) {
    return next(error);
  }
});

router.put('/:key', validateRequest(updateSettingSchema), async (req: AuthRequest, res, next) => {
  try {
    const { value, type } = req.body;

    const setting = await prisma.systemSetting.upsert({
      where: { key: req.params.key },
      create: {
        key: req.params.key,
        value: String(value),
        type: type || 'string',
      },
      update: {
        value: String(value),
        type: type || 'string',
      },
    });

    res.json(setting);
  } catch (error) {
    return next(error);
  }
});

export default router;

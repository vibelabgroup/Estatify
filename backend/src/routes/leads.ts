import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { validateRequest, validateQuery } from '../middleware/validation';
import { ImportService } from '../services/ImportService';
import { LeadService } from '../services/LeadService';
import { AppError } from '../middleware/errorHandler';
import Joi from 'joi';

const router = Router();
const prisma = new PrismaClient();
const importService = new ImportService();
const leadService = new LeadService(prisma);

const createLeadSchema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  phone: Joi.string(),
  company: Joi.string(),
  source: Joi.string(),
  tags: Joi.array().items(Joi.string()),
  customFields: Joi.object(),
});

const updateLeadSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  phone: Joi.string(),
  company: Joi.string(),
  status: Joi.string(),
  tags: Joi.array().items(Joi.string()),
  customFields: Joi.object(),
});

const importSchema = Joi.object({
  csv: Joi.string().required(),
  source: Joi.string(),
});

const querySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
  status: Joi.string(),
  search: Joi.string(),
  sortBy: Joi.string(),
  sortOrder: Joi.string().valid('asc', 'desc'),
  tags: Joi.string(),
});

router.use(authMiddleware);

router.get('/', validateQuery(querySchema), async (req: AuthRequest, res, next) => {
  try {
    const { page, limit, status, search, sortBy, sortOrder, tags } = req.query;
    
    const options = {
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      status: status as string,
      search: search as string,
      sortBy: sortBy as string,
      sortOrder: sortOrder as 'asc' | 'desc',
      tags: tags ? (tags as string).split(',') : undefined,
    };

    const result = await leadService.getLeads(options);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req: AuthRequest, res, next) => {
  try {
    const lead = await prisma.lead.findUnique({
      where: { id: req.params.id },
    });

    if (!lead) {
      throw new AppError(404, 'Lead not found');
    }

    res.json(lead);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/analytics', async (req: AuthRequest, res, next) => {
  try {
    const analytics = await leadService.getLeadAnalytics(req.params.id);
    res.json(analytics);
  } catch (error) {
    next(error);
  }
});

router.post('/', validateRequest(createLeadSchema), async (req: AuthRequest, res, next) => {
  try {
    const lead = await prisma.lead.create({
      data: req.body,
    });
    res.status(201).json(lead);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', validateRequest(updateLeadSchema), async (req: AuthRequest, res, next) => {
  try {
    const lead = await prisma.lead.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(lead);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req: AuthRequest, res, next) => {
  try {
    await prisma.lead.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

router.post('/import', validateRequest(importSchema), async (req: AuthRequest, res, next) => {
  try {
    const { csv, source } = req.body;
    const result = await importService.importLeads(csv, source);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/export', async (req: AuthRequest, res, next) => {
  try {
    const csv = await importService.exportLeads(req.body.filters || {});
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
    res.send(csv);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/assign-sequence', async (req: AuthRequest, res, next) => {
  try {
    const { sequenceId } = req.body;
    const assignment = await leadService.assignSequence(req.params.id, sequenceId);
    res.json(assignment);
  } catch (error) {
    next(error);
  }
});

export default router;

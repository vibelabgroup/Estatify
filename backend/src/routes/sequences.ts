import { Router } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { FollowupService } from '../services/FollowupService';
import Joi from 'joi';

const router = Router();
const followupService = new FollowupService();

const createSequenceSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  triggerEvent: Joi.string().valid('no_response', 'opened', 'clicked', 'submitted_form').required(),
  triggerDelay: Joi.number().integer().min(0).required(),
  steps: Joi.array().items(
    Joi.object({
      subject: Joi.string().required(),
      body: Joi.string().required(),
      delayHours: Joi.number().integer().min(0).required(),
    })
  ).min(1).required(),
});

const updateSequenceSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  triggerEvent: Joi.string().valid('no_response', 'opened', 'clicked', 'submitted_form'),
  triggerDelay: Joi.number().integer().min(0),
  isActive: Joi.boolean(),
  steps: Joi.array().items(
    Joi.object({
      subject: Joi.string().required(),
      body: Joi.string().required(),
      delayHours: Joi.number().integer().min(0).required(),
    })
  ),
});

router.use(authMiddleware);

router.get('/', async (_req: AuthRequest, res, next) => {
  try {
    const { isActive } = _req.query;
    const sequences = await followupService.getSequences({
      isActive: isActive === 'true' ? true : undefined,
    });
    res.json(sequences);
  } catch (error) {
    next(error);
  }
});

router.post('/', validateRequest(createSequenceSchema), async (req: AuthRequest, res, next) => {
  try {
    const sequence = await followupService.createSequence(req.body);
    res.status(201).json(sequence);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', validateRequest(updateSequenceSchema), async (req: AuthRequest, res, next) => {
  try {
    const sequence = await followupService.updateSequence(req.params.id, req.body);
    res.json(sequence);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req: AuthRequest, res, next) => {
  try {
    await followupService.deleteSequence(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

router.post('/:leadId/pause/:sequenceId', async (req: AuthRequest, res, next) => {
  try {
    await followupService.pauseSequenceForLead(req.params.leadId, req.params.sequenceId);
    res.json({ message: 'Sequence paused' });
  } catch (error) {
    next(error);
  }
});

router.post('/:leadId/resume/:sequenceId', async (req: AuthRequest, res, next) => {
  try {
    await followupService.resumeSequenceForLead(req.params.leadId, req.params.sequenceId);
    res.json({ message: 'Sequence resumed' });
  } catch (error) {
    next(error);
  }
});

export default router;

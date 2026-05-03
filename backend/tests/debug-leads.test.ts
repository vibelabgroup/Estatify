import request from 'supertest';
import express from 'express';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { PrismaClient } from '@prisma/client';
import { LeadService } from '../src/services/LeadService';
import { errorHandler } from '../src/middleware/errorHandler';

// Set environment variables
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'file:./test.db';
process.env.JWT_SECRET = 'test-jwt-secret-64-chars-minimum-for-testing-only';

const prisma = new PrismaClient();
const leadService = new LeadService(prisma);

describe('Lead Service Debug', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.lead.deleteMany();
  });

  it('should test basic LeadService functionality', async () => {
    // First create a lead to ensure we have data
    await prisma.lead.create({
      data: {
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
      },
    });

    // Test the LeadService directly
    const result = await leadService.getLeads({
      page: 1,
      limit: 10,
    });

    console.log('LeadService result:', result);
    
    expect(result).toHaveProperty('leads');
    expect(result).toHaveProperty('pagination');
    expect(result.leads).toHaveLength(1);
    expect(result.pagination.total).toBe(1);
  });

  it('should test leads API endpoint', async () => {
    // Create a simple Express app with just the leads route
    const app = express();
    app.use(express.json());

    // Add a simple leads endpoint
    app.get('/api/leads', async (_req, res, next) => {
      try {
        const result = await leadService.getLeads({
          page: 1,
          limit: 10,
        });
        res.json(result);
      } catch (error) {
        next(error);
      }
    });

    app.use(errorHandler);

    // First create a lead
    await prisma.lead.create({
      data: {
        email: 'test2@example.com',
        firstName: 'Test2',
        lastName: 'User2',
      },
    });

    const response = await request(app)
      .get('/api/leads');

    console.log('API response:', response.body);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('leads');
    expect(response.body).toHaveProperty('pagination');
  });
});

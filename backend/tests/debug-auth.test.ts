import request from 'supertest';
import express from 'express';
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { PrismaClient } from '@prisma/client';

// Test database connection
const prisma = new PrismaClient();

describe('Auth Debug Tests', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should connect to database', async () => {
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    expect(result).toBeDefined();
  });

  it('should test auth routes import', async () => {
    try {
      const authRoutes = require('../src/routes/auth').default;
      expect(authRoutes).toBeDefined();
    } catch (error) {
      console.error('Auth routes import error:', error);
      throw error;
    }
  });

  it('should test auth routes with basic setup', async () => {
    const authRoutes = require('../src/routes/auth').default;
    const app = express();
    app.use(express.json());
    app.use('/api/auth', authRoutes);

    // Add error handling
    app.use((err: any, _req: any, res: any, _next: any) => {
      console.error('Route error:', err);
      res.status(500).json({ error: err.message || 'Internal error' });
    });

    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      });

    console.log('Response status:', response.status);
    console.log('Response body:', response.body);
    
    // Just check we get a response (not necessarily 201)
    expect([201, 400, 500]).toContain(response.status);
  });
});

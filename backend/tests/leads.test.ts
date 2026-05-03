import request from 'supertest';
import express from 'express';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { PrismaClient } from '@prisma/client';
import leadRoutes from '../src/routes/leads';
import authRoutes from '../src/routes/auth';
import { errorHandler } from '../src/middleware/errorHandler';

// Set environment variables before importing anything
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'file:./test.db';
process.env.JWT_SECRET = 'test-jwt-secret-64-chars-minimum-for-testing-only';
process.env.FRONTEND_URL = 'http://localhost:3000';

// SMTP test configuration
process.env.SMTP_HOST = 'smtp.test.com';
process.env.SMTP_PORT = '587';
process.env.SMTP_SECURE = 'false';
process.env.SMTP_ACCOUNT_1 = 'test1@example.com';
process.env.SMTP_PASSWORD_1 = 'test-password-1';
process.env.SMTP_ACCOUNT_2 = 'test2@example.com';
process.env.SMTP_PASSWORD_2 = 'test-password-2';
process.env.EMAIL_RATE_LIMIT = '10';
process.env.DAILY_EMAIL_LIMIT = '100';
process.env.LOG_LEVEL = 'error';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// Add proper error handling middleware for tests
app.use(errorHandler);

describe('Lead Routes', () => {
  let authToken: string;

  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    // Clean up database before each test
    await prisma.user.deleteMany();
    await prisma.lead.deleteMany();
    
    // Create a user and get auth token for each test
    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'leadtest@example.com',
        password: 'password123',
        name: 'Lead Test User',
      });
    
    authToken = registerResponse.body.token;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('POST /api/leads', () => {
    it('should create a new lead', async () => {
      const response = await request(app)
        .post('/api/leads')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          email: 'newlead@example.com',
          firstName: 'John',
          lastName: 'Doe',
          company: 'Test Company',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('email', 'newlead@example.com');
    });

    it('should require authentication', async () => {
      const response = await request(app)
        .post('/api/leads')
        .send({
          email: 'test@example.com',
        });

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/leads', () => {
    it('should get all leads', async () => {
      const response = await request(app)
        .get('/api/leads')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('leads');
      expect(response.body).toHaveProperty('pagination');
    });

    it('should support pagination', async () => {
      const response = await request(app)
        .get('/api/leads?page=1&limit=10')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.pagination.limit).toBe(10);
    });
  });

  describe('GET /api/leads/:id', () => {
    it('should get a lead by ID', async () => {
      // First, create a lead
      const createResponse = await request(app)
        .post('/api/leads')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          email: 'getlead@example.com',
          firstName: 'John',
          lastName: 'Doe',
        });

      const leadId = createResponse.body.id;

      // Then get the lead
      const response = await request(app)
        .get(`/api/leads/${leadId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(leadId);
    });

    it('should return 404 for non-existent lead', async () => {
      const response = await request(app)
        .get('/api/leads/non-existent-id')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/leads/:id', () => {
    it('should update a lead', async () => {
      // First, create a lead
      const createResponse = await request(app)
        .post('/api/leads')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          email: 'updatelead@example.com',
          firstName: 'John',
          lastName: 'Doe',
        });

      const leadId = createResponse.body.id;

      // Then update the lead
      const response = await request(app)
        .put(`/api/leads/${leadId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          firstName: 'Updated Name',
        });

      expect(response.status).toBe(200);
      expect(response.body.firstName).toBe('Updated Name');
    });
  });

  describe('DELETE /api/leads/:id', () => {
    it('should delete a lead', async () => {
      // First, create a lead
      const createResponse = await request(app)
        .post('/api/leads')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          email: 'deletelead@example.com',
          firstName: 'John',
          lastName: 'Doe',
        });

      const leadId = createResponse.body.id;

      // Then delete the lead
      const response = await request(app)
        .delete(`/api/leads/${leadId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(204);
    });
  });
});

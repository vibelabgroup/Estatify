import request from 'supertest';
import express from 'express';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { PrismaClient } from '@prisma/client';
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

// Add proper error handling middleware for tests
app.use(errorHandler);

describe('Auth Routes', () => {

  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    // Clean up database before each test
    await prisma.user.deleteMany();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User',
        });

      if (response.status !== 201) {
        console.log('Response status:', response.status);
        console.log('Response body:', response.body);
      }
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe('test@example.com');
    });

    it('should not register duplicate email', async () => {
      // First, create a user
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'duplicate@example.com',
          password: 'password123',
          name: 'Test User',
        });

      // Then try to create the same user again
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'duplicate@example.com',
          password: 'password123',
          name: 'Test User',
        });

      expect(response.status).toBe(409);
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      // First, create a user to login with
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'login@example.com',
          password: 'password123',
          name: 'Test User',
        });

      // Then try to login
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
    });

    it('should not login with invalid credentials', async () => {
      // First, create a user
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'invalid@example.com',
          password: 'password123',
          name: 'Test User',
        });

      // Then try to login with wrong password
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'invalid@example.com',
          password: 'wrongpassword',
        });

      expect(response.status).toBe(401);
    });

    it('should not login with non-existent user', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123',
        });

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/auth/verify', () => {
    it('should verify valid token', async () => {
      // Create a user and get a token
      const registerResponse = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'verify@example.com',
          password: 'password123',
          name: 'Test User',
        });

      const token = registerResponse.body.token;

      // Then verify the token
      const response = await request(app)
        .get('/api/auth/verify')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('user');
    });

    it('should reject invalid token', async () => {
      const response = await request(app)
        .get('/api/auth/verify')
        .set('Authorization', 'Bearer invalidtoken');

      expect(response.status).toBe(401);
    });

    it('should reject missing token', async () => {
      const response = await request(app)
        .get('/api/auth/verify');

      expect(response.status).toBe(401);
    });
  });
});

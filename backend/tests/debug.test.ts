import request from 'supertest';
import express from 'express';
import { describe, it, expect } from '@jest/globals';

describe('Debug Tests', () => {
  it('should create a basic express app', async () => {
    const app = express();
    app.get('/test', (_req, res) => {
      res.json({ message: 'Hello World' });
    });

    const response = await request(app).get('/test');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hello World');
  });

  it('should handle basic auth route without database', async () => {
    const app = express();
    app.use(express.json());
    
    // Mock auth route without database
    app.post('/api/auth/register', (req, res) => {
      res.status(201).json({
        user: { id: '1', email: req.body.email, name: req.body.name },
        token: 'mock-token'
      });
    });

    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('token');
  });
});

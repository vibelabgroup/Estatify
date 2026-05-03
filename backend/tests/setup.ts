import dotenv from 'dotenv';

// Load environment variables for tests
dotenv.config();

// Set test-specific environment variables
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'file:./test.db'; // Use the test database we just created
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

// Test database setup
console.log('Test DATABASE_URL:', process.env.DATABASE_URL);

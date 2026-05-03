import dotenv from 'dotenv';

dotenv.config();

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  
  // Database
  databaseUrl: process.env.DATABASE_URL!,
  
  // Redis
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  
  // JWT
  jwtSecret: process.env.JWT_SECRET!,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  
  // Frontend
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  
  // Email
  emailFrom: process.env.EMAIL_FROM || 'noreply@estatify.ai',
  emailFromName: process.env.EMAIL_FROM_NAME || 'Estatify',
  
  // SMTP
  smtpHost: process.env.SMTP_HOST || 'smtp.hostinger.com',
  smtpPort: parseInt(process.env.SMTP_PORT || '465', 10),
  smtpSecure: process.env.SMTP_SECURE === 'true',
  smtpAccounts: [
    {
      email: process.env.SMTP_ACCOUNT_1!,
      password: process.env.SMTP_PASSWORD_1!,
    },
    {
      email: process.env.SMTP_ACCOUNT_2!,
      password: process.env.SMTP_PASSWORD_2!,
    },
  ].filter(acc => acc.email && acc.password),
  
  // Email limits
  emailRateLimit: parseInt(process.env.EMAIL_RATE_LIMIT || '50', 10),
  dailyEmailLimit: parseInt(process.env.DAILY_EMAIL_LIMIT || '100', 10),
  
  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',
};

// Validate required environment variables
const requiredEnvVars = [
  'DATABASE_URL',
  'JWT_SECRET',
  'SMTP_ACCOUNT_1',
  'SMTP_PASSWORD_1',
  'SMTP_ACCOUNT_2',
  'SMTP_PASSWORD_2',
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

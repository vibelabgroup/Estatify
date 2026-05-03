# Estatify Email Lead Management Backend

Backend API for the Estatify.ai email lead management system.

## Features

- Multi-account email rotation (dan@estatify.ai, nico@estatify.ai)
- Daily email limit enforcement (100 per account)
- Lead import from CSV
- Email tracking (opens, clicks, bounces)
- Automated followup sequences
- Campaign management
- Analytics dashboard

## Tech Stack

- Node.js 20
- TypeScript
- Express
- PostgreSQL 15
- Redis 7
- Prisma ORM
- Bull (queue system)
- Nodemailer

## Setup

### Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local development)
- Hostinger email accounts configured

### Environment Variables

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Required variables:
- `DB_USER` - PostgreSQL username
- `DB_PASSWORD` - PostgreSQL password
- `JWT_SECRET` - JWT secret key (64+ characters)
- `SMTP_ACCOUNT_1` - First email account (dan@estatify.ai)
- `SMTP_PASSWORD_1` - First email password
- `SMTP_ACCOUNT_2` - Second email account (nico@estatify.ai)
- `SMTP_PASSWORD_2` - Second email password

### Local Development

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Start development server
npm run dev
```

### Docker Deployment

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Run migrations
docker-compose exec backend npx prisma migrate deploy

# Stop services
docker-compose down
```

## API Endpoints

### Health Check
- `GET /health` - Health check endpoint

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/verify` - Verify token

### Leads
- `GET /api/leads` - Get all leads
- `POST /api/leads` - Create new lead
- `POST /api/leads/import` - Import leads from CSV
- `GET /api/leads/:id` - Get lead by ID
- `PUT /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead

### Email
- `POST /api/email/send` - Send single email
- `POST /api/email/bulk` - Send bulk emails
- `GET /api/email/queue/stats` - Get queue statistics
- `GET /api/email/stats/daily` - Get daily email stats

### Tracking (Public)
- `GET /api/track/open/:id` - Track email open
- `GET /api/track/click/:id` - Track email click
- `GET /api/track/unsubscribe/:id` - Unsubscribe

## Database Schema

See `prisma/schema.prisma` for the complete database schema.

Main tables:
- `users` - Admin users
- `leads` - Lead information
- `email_campaigns` - Email campaigns
- `email_logs` - Email send logs
- `followup_sequences` - Automated followup sequences
- `tracking_events` - Email tracking events

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

## Scripts

- `npm run build` - Build TypeScript
- `npm start` - Start production server
- `npm run dev` - Start development server
- `npm test` - Run tests
- `npm run lint` - Lint code
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run migrations
- `npm run prisma:studio` - Open Prisma Studio

## Logging

Logs are stored in the `logs/` directory:
- `combined.log` - All logs
- `error.log` - Error logs only

## Monitoring

- Health check: `GET /health`
- Queue stats: `GET /api/email/queue/stats`
- Daily email stats: `GET /api/email/stats/daily`

## Security

- JWT authentication
- Rate limiting
- Input validation
- SQL injection prevention
- XSS protection

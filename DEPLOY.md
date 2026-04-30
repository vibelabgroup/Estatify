# Estatify Frontend Deployment Guide

## Hostinger VPS KVM2 Ubuntu Deployment

### Prerequisites

- Ubuntu 22.04+ on Hostinger KVM2 VPS
- Docker & Docker Compose installed
- Traefik v3 running with Let's Encrypt
- Domain (estatify.ai) pointed to VPS IP

### VPS Setup Steps

1. **SSH into your VPS:**
```bash
ssh root@92.112.180.117
```

2. **Navigate to the project directory:**
```bash
cd /root/estatify-frontend
```

3. **Create environment file:**
```bash
cp .env.example .env
# Edit .env with your actual values
nano .env
```

4. **Build and deploy:**
```bash
# Stop and remove old containers
docker compose down

# Clean up unused images (optional)
docker system prune -f

# Build and start
docker compose up -d --build

# Check logs
docker compose logs -f
```

### SSL/TLS Configuration

The docker-compose.yml includes the correct Traefik v3 syntax:

```yaml
# HTTPS Router with Let's Encrypt
traefik.http.routers.estatify.rule=Host(`estatify.ai`) || Host(`www.estatify.ai`)
traefik.http.routers.estatify.tls.certresolver=letsencrypt

# HTTP to HTTPS redirect
traefik.http.routers.estatify-http.rule=Host(`estatify.ai`) || Host(`www.estatify.ai`)
traefik.http.routers.estatify-http.middlewares=redirect-to-https
```

### Important Traefik v3 Syntax Notes

- **Correct:** `Host(`estatify.ai`) || Host(`www.estatify.ai`)`
- **Wrong:** `Host(`estatify.ai`, `www.estatify.ai`)` (v2 syntax, breaks in v3)

### Hostinger Webmail Configuration

Configure email in your `.env` file:

```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=your-email@estatify.ai
SMTP_PASS=your_password
```

### Troubleshooting

**SSL Certificate Issues:**
```bash
# Check Traefik logs
docker logs traefik --tail 50

# Verify DNS is correct
dig estatify.ai +short
dig www.estatify.ai +short
```

**Build Issues:**
```bash
# Clean rebuild
docker compose down
docker system prune -f
docker compose build --no-cache
docker compose up -d
```

**Container not starting:**
```bash
# Check logs
docker compose logs app

# Verify network exists
docker network ls | grep traefik-proxy
```

### Maintenance

**Update deployment:**
```bash
cd /root/estatify-frontend
git pull
docker compose down
docker compose up -d --build
```

**View logs:**
```bash
docker compose logs -f app
docker logs traefik --tail 20
```

import { Router } from 'express';
import { TrackingService } from '../services/TrackingService';

const router = Router();
const trackingService = new TrackingService();

router.get('/open/:id', async (req, res) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const userAgent = req.headers['user-agent'] || 'unknown';

  const pixel = await trackingService.trackOpen(req.params.id, ip, userAgent);
  
  res.setHeader('Content-Type', 'image/gif');
  res.send(pixel);
});

router.get('/click/:id', async (req, res) => {
  const { url } = req.query;
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const userAgent = req.headers['user-agent'] || 'unknown';

  if (!url || typeof url !== 'string') {
    return res.status(400).send('Invalid URL');
  }

  const redirectUrl = await trackingService.trackClick(req.params.id, url, ip, userAgent);
  
  return res.redirect(redirectUrl);
});

router.get('/unsubscribe/:id', async (req, res) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';

  try {
    await trackingService.trackUnsubscribe(req.params.id, ip);
    res.send(`
      <html>
        <body>
          <h1>Unsubscribed</h1>
          <p>You have been successfully unsubscribed from our emails.</p>
        </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send('Error processing unsubscribe');
  }
});

export default router;

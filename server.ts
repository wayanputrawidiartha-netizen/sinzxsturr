import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Helper to adapt Netlify Function handlers to Express routes
function adaptNetlifyHandler(handlerModule: any) {
  return async (req: Request, res: Response) => {
    try {
      const event = {
        httpMethod: req.method,
        path: req.path,
        headers: req.headers as Record<string, string>,
        queryStringParameters: req.query as Record<string, string>,
        body: req.body ? JSON.stringify(req.body) : null,
      };

      const result = await handlerModule.handler(event, {} as any);
      if (result.headers) {
        Object.entries(result.headers).forEach(([k, v]) => {
          res.setHeader(k, v as string);
        });
      }
      res.status(result.statusCode).send(result.body);
    } catch (err: any) {
      console.error('API Error:', err);
      res.status(500).json({ success: false, error: err.message || 'Internal server error' });
    }
  };
}

async function startServer() {
  // Dynamically import netlify functions to use the exact same logic
  const settingsHandler = await import('./netlify/functions/settings.ts');
  const rekberFeesHandler = await import('./netlify/functions/rekber-fees.ts');
  const faqsHandler = await import('./netlify/functions/faqs.ts');
  const gameServicesHandler = await import('./netlify/functions/game-services.ts');
  const adminVerifyHandler = await import('./netlify/functions/admin-verify.ts');

  // Register API routes for both /api/* and /.netlify/functions/*
  const routeConfigs = [
    { path: 'settings', handler: settingsHandler },
    { path: 'rekber-fees', handler: rekberFeesHandler },
    { path: 'faqs', handler: faqsHandler },
    { path: 'game-services', handler: gameServicesHandler },
    { path: 'admin-verify', handler: adminVerifyHandler },
  ];

  routeConfigs.forEach(({ path: routePath, handler: h }) => {
    const expressHandler = adaptNetlifyHandler(h);
    app.all(`/api/${routePath}`, expressHandler);
    app.all(`/.netlify/functions/${routePath}`, expressHandler);
  });

  if (!isProduction) {
    // Development mode: Mount Vite dev server middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    // Production mode: Serve built static files
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

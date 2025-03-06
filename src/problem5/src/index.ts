import { app } from './app';
import { db } from './config/db';

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('Server running on port %d', port);
});

// Handling graceful shutdown
const shutdown = async () => {
  console.log('shutting down');

  server.close();

  await db.$disconnect()

  console.log('server gracefully shut down');
};

const abortSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

for (const signal of abortSignals) {
  process.on(signal, shutdown);
}

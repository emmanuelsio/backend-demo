import { env } from '@/common/utils/envConfig';
import { app, logger } from '@/server';

import { AppDataSource } from './data-source';

const server = app.listen(env.PORT, async () => {
  const { NODE_ENV, HOST, PORT } = env;
  logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
  await AppDataSource.initialize();
  logger.info(`DB running on port 5432`);
});

const onCloseSignal = () => {
  logger.info('sigint received, shutting down');
  server.close(() => {
    logger.info('server closed');
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on('SIGINT', onCloseSignal);
process.on('SIGTERM', onCloseSignal);

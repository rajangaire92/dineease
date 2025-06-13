import pinoLogger from 'pino';
import pinoHttp from 'pino-http';

export const logger =
  process.env['ENVIRONMENT'] === 'dev' || process.env['ENVIRONMENT'] === 'test'
    ? pinoLogger({
        level: process.env['PINO_LOG_LEVEL'],
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
      })
    : pinoLogger({
        level: process.env['PINO_LOG_LEVEL'],
      });

export const loggerMiddleware = pinoHttp({
  logger,
});

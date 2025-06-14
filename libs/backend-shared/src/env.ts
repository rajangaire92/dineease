import { z } from 'zod';

type TPinoLogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
type TEnvironment = 'prod' | 'dev' | 'test';

console.log('ENVIRONMENT', process.env['ENVIRONMENT']);

if (!process.env['ENVIRONMENT']) {
  console.error('ENVIRONMENT is not set');
  process.exit(1);
}

const envSchema = z.object({
  PORT: z.number(),
  WHITELISTED_ORIGINS: z.array(z.string()),
  PINO_LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']),
  ENVIRONMENT: z.enum(['prod', 'dev', 'test']),
  DATABASE_URL: z.string().min(1),
  auth: z.object({
    SALT_ROUNDS: z.number(),
    TOKEN_SECRET: z.string().min(1),
    ACCESS_TOKEN_AGE: z.number(),
    REFRESH_TOKEN_AGE: z.number(),
    OTP_AGE: z.number(),
    OTP_SECRET: z.string().min(1),
  }),
});

type TEnv = z.infer<typeof envSchema>;

const env: TEnv = {
  PORT: Number(process.env['PORT']),
  WHITELISTED_ORIGINS: process.env['WHITELISTED_ORIGINS']?.split(',') ?? [],
  PINO_LOG_LEVEL: (process.env['PINO_LOG_LEVEL'] as TPinoLogLevel) ?? 'info',
  ENVIRONMENT: (process.env['ENVIRONMENT'] as TEnvironment) || 'prod',
  DATABASE_URL: process.env['DATABASE_URL'] || '',
  auth: {
    SALT_ROUNDS: Number(process.env['SALT_ROUNDS']) || 10,
    TOKEN_SECRET: process.env['TOKEN_SECRET'] || '',
    ACCESS_TOKEN_AGE: Number(process.env['ACCESS_TOKEN_AGE']) || 60000,
    REFRESH_TOKEN_AGE: Number(process.env['REFRESH_TOKEN_AGE']) || 86400000,
    OTP_AGE: Number(process.env['OTP_AGE']) || 50,
    OTP_SECRET: process.env['OTP_SECRET'] || '',
  },
};

const validateEnv = (env: TEnv) => {
  console.log('validating env.....................');
  const result = envSchema.safeParse(env);
  if (!result.success) {
    console.error(result.error.flatten().fieldErrors);
    process.exit(1);
  }
  console.log('env validated.....................', result.data);
};

validateEnv(env);

export { env };

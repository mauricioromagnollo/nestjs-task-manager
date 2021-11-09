import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  STAGE: Joi.string().required(),
  // Application
  PORT: Joi.number().default(3000).required(),
  // CORS
  CORS_ORIGIN: Joi.string().required(),
  // PostgreSQL
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().default(3000).required(),
  POSTGRES_USERNAME: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DATABASE: Joi.string().required(),
  // JWT
  JWT_SECRET: Joi.string().required(),
});

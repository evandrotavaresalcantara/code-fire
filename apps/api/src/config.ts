import "dotenv/config";
import { z } from "zod";

const MSG_API = "API_PORT deve ser um número entre 1000 a 9999";
const MSG_AMQP_PORT = "AMQP_PORT deve ser um número entre 1000 a 9999";
const MSG_BASE_URL = "BASE_URL dever ser uma string de URL";
const MSG_DATABASE_URL =
  "DATABASE_URL dever ser uma string de conexão 'postgres://user:pass@localhost:5432/dbname'";
const MSG_CORS_ORIGIN = "O Cors origin deve ser um string de endereço URL";

const envSchema = z.object({
  API_PORT: z
    .string({
      invalid_type_error: MSG_API,
    })
    .regex(/^[1-9]\d{3}$/, {
      message: MSG_API,
    })
    .min(4, { message: MSG_API })
    .max(4, { message: MSG_API })
    .default("8000"),
  LOGGER_LEVELINFO: z
    .enum(["dev", "combined", "common", "short", "tiny"])
    .default("dev"),
  NODE_ENV: z.string().default("dev"),
  DATABASE_URL: z.string({ message: MSG_DATABASE_URL }),
  BASE_URL: z.string().url({ message: MSG_BASE_URL }),
  CORS_ORIGIN: z
    .string({ message: MSG_CORS_ORIGIN })
    .transform((value) => value.split(",")),
  AMQP_USER: z.optional(z.string()),
  AMQP_PASSWORD: z.optional(z.string()),
  AMQP_HOST: z.string().default("localhost"),
  AMQP_PORT: z
    .string()
    .regex(/^\d+$/, {
      message: MSG_AMQP_PORT,
    })
    .min(4)
    .max(4)
    .default("5672"),
  EMAIL_HOST: z.optional(z.string()),
  EMAIL_HOST_USER: z.optional(z.string()),
  EMAIL_HOST_PASSWORD: z.optional(z.string()),
  EMAIL_HOST_PORT: z
    .string()
    .regex(/^\d+$/, {
      message: MSG_AMQP_PORT,
    })
    .min(2)
    .max(4)
    .default("587"),
  EMAIL_HOST_SECURE_SSL: z
    .string()
    .transform((value) => value === "true")
    .default("false"),
});

export const ENV = envSchema.parse(process.env);

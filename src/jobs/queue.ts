// src/queues/queue.ts
import { Queue } from "bullmq";
import IORedis from "ioredis";
import "dotenv/config";

// Build ioredis connection using the same env vars you use in redisClient.ts
const redisOpts = {
  host: process.env.DIPL_REDIS_HOST || "127.0.0.1",
  port: Number(process.env.DIPL_REDIS_PORT ?? 6379),
  username: "default",
  password: process.env.DIPL_REDIS_PASSWORD,

  // Recommended BullMQ production flags
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  connectTimeout: 10000,

  // Enable TLS if required
  ...(process.env.REDIS_TLS === "true" ? { tls: {} } : {}),
};

// Create ioredis instance
export const connection = new IORedis(redisOpts);

// Create BullMQ queue
export const importQueue = new Queue("products-import", {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 2000 },
    removeOnComplete: 100,
    removeOnFail: false,
  },
});

// Shared types
export type ProductsPayload = {
  products: Array<{
    product_id: string;
    product_name: string;
    about_product?: string;
    discounted_price: number;
    actual_price: number;
    discount_percentage: number;
    rating: number;
    rating_count?: number;
    category: string;
    user_name: string;
    review_title: string;
    review_content: string;
  }>;
  _progress?: ImportProgress;
};

export type ImportProgress = {
  total: number;
  processed: number;
  succeeded: number;
  failed: number;
  percent: number;
  done: boolean;
  errors?: Array<{
    index: number;
    message: string;
    product?: any;
  }>;
};

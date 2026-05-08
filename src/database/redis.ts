// src/redisClient.ts
import { createClient } from "redis";
import "dotenv/config";

const redisClient = createClient({
  username: "default",
  password: process.env.DIPL_REDIS_PASSWORD,
  socket: {
    host: process.env.DIPL_REDIS_HOST,
    port: parseInt(process.env.DIPL_REDIS_PORT || "6379"),
    connectTimeout: 10000,
    ...(process.env.REDIS_TLS === "true" ? { tls: true } : {}),
  },
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("✅ Connected to Redis");
  }
};

export default redisClient;

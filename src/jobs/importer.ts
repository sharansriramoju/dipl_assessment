// src/importer.ts
import { Worker, Job } from "bullmq";
import Bottleneck from "bottleneck";
import { connection } from "./queue";
import type { ProductsPayload, ImportProgress } from "./queue";
import { updateJobQueueStatus } from "../database/repositories/jobQueues.repository";
import { addProductServiceForBulkUpload } from "../services/products.service";

const limiter = new Bottleneck({
  minTime: 200, // ~5 req/s; tune based on observed limits
  maxConcurrent: 2,
});

async function processProduct(product: any) {
  return limiter.schedule(() => addProductServiceForBulkUpload(product));
}

const importWorkerConcurrency = Math.max(
  1,
  Number(process.env.IMPORT_JOB_CONCURRENCY ?? 3),
);

export const importWorker = new Worker<ProductsPayload>(
  "products-import",
  async (job: Job<ProductsPayload>) => {
    try {
      const { products } = job.data;
      console.log(
        `Import job started: ${job.id} with ${products.length} customers`,
      );
      const total = products.length;

      const state: ImportProgress = {
        total,
        processed: 0,
        succeeded: 0,
        failed: 0,
        percent: 0,
        done: false,
        errors: [],
      };

      // process in small batches to control memory/flush progress more often
      const BATCH = 25;
      for (let i = 0; i < total; i += BATCH) {
        const slice = products.slice(i, i + BATCH);
        await Promise.all(
          slice.map(async (prod, idx) => {
            const absoluteIndex = i + idx;
            try {
              await processProduct(prod);
              state.succeeded += 1;
            } catch (e: any) {
              console.log(
                `Error processing product at index ${absoluteIndex}:`,
                e?.message,
              );
              state.failed += 1;
              state.errors!.push({
                index: absoluteIndex,
                message: e?.message ?? "Zoho create failed",
                product: prod,
              });
            } finally {
              state.processed += 1;
              state.percent = Math.floor((state.processed / total) * 100);
              await job.updateProgress(state.percent); // BullMQ built-in % field
              await job.updateData({ ...job.data, _progress: state }); // stash details
            }
          }),
        );
      }
      const status = await job.getState();
      const progressValue = job.progress as number | object;
      const snapshot: ImportProgress = job.data._progress ?? {
        total: 0,
        processed: 0,
        succeeded: 0,
        failed: 0,
        percent:
          typeof progressValue === "number"
            ? progressValue
            : Number(progressValue as any) || 0,
        done: status === "completed",
        errors: [],
      };
      state.done = true;
      console.log(
        `Import job completed: ${job.id}. Success: ${state.succeeded}, Failed: ${state.failed}`,
      );
      await updateJobQueueStatus(job.id!, "completed", {
        state: "completed",
        progress: snapshot,
        returnValue: status === "completed" ? job.returnvalue : null,
        failedReason: job.failedReason ?? null,
      });
      await job.updateData({ ...job.data, _progress: state });
      return state;
    } catch (error) {
      console.error("Error in importWorker:", error);
      return;
    } // job return value
  },
  { connection, concurrency: importWorkerConcurrency },
);

// Optional: observe global errors
importWorker.on("failed", (job, err) => {
  console.error("Job failed", job?.id, err?.message);
});

importWorker.on("error", (err) => {
  console.error("Import worker error:", err);
});

importWorker.on("ready", () => {
  console.log(
    `✅ Import worker is ready and listening for jobs (concurrency=${importWorkerConcurrency})`,
  );
});

console.log(
  `🔄 Import worker initialized with concurrency=${importWorkerConcurrency}`,
);

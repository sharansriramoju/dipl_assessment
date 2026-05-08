import { Transaction } from "sequelize";
import { JobQueue } from "../models";

export const addJobQueue = async (
  data: {
    job_id: string;
    status?: string;
    file_name?: string;
  },
  t?: Transaction,
) => {
  try {
    await JobQueue.create(data, { transaction: t });
  } catch (error) {
    console.error("Error in addJobQueue:", error);
    throw new Error("Error adding job to queue");
  }
};

export const updateJobQueueStatus = async (
  job_id: string,
  status: string,
  result?: object,
  t?: Transaction,
) => {
  try {
    await JobQueue.update(
      { status, result },
      { where: { job_id }, transaction: t },
    );
  } catch (error) {
    console.error("Error in updateJobQueueStatus:", error);
    throw new Error("Error updating job queue status");
  }
};

export const getJobQueueById = async (job_id: string) => {
  try {
    const jobQueue = await JobQueue.findOne({ where: { job_id } });
    return jobQueue;
  } catch (error) {
    console.error("Error in getJobQueueById:", error);
    throw new Error("Error getting job queue by ID");
  }
};

export const getLatestRunningJobQueueBySchoolAndType = async (
  t?: Transaction,
) => {
  try {
    const jobQueue = await JobQueue.findOne({
      where: { status: "pending" },
      order: [["created_at", "DESC"]],
      transaction: t,
    });
    return jobQueue;
  } catch (error) {
    console.error("Error in getLatestJobQueueBySchoolAndType:", error);
    throw new Error("Error getting latest job queue by school and type");
  }
};

export const getAllJobQueuesBySchoolId = async (
  data: {
    limit: number;
    offset: number;
  },
  t?: Transaction,
) => {
  try {
    const jobQueues = await JobQueue.findAndCountAll({
      where: { status: "completed" },
      limit: data.limit,
      offset: data.offset,
      order: [["created_at", "DESC"]],
      transaction: t,
    });
    return jobQueues;
  } catch (error) {
    console.error("Error in getAllJobQueuesBySchoolId:", error);
    throw new Error("Error getting all job queues by school ID");
  }
};

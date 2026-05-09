import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { getAllJobQueuesService } from "../services/jobQueues.service";

export const getAllJobsController = asyncHandler(
  async (req: Request, res: Response) => {
    const jobs = await getAllJobQueuesService(req.query);
    return res.status(200).json({
      message: "Job queues fetched successfully",
      data: jobs,
      success: true,
    });
  },
);

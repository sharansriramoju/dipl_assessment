import { Router } from "express";
import { getAllJobsController } from "../controllers/jobQueues.controller";
import { validateQuery } from "../middlewares/index.middleware";
import { getAllJobsSchema } from "../validations/jobQueues.validation";

export default (router: Router) => {
  router.get(
    "/job-queues",
    validateQuery(getAllJobsSchema),
    getAllJobsController,
  );
};

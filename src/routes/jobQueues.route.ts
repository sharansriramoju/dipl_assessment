import { Router } from "express";
import { getAllJobsController } from "../controllers/jobQueues.controller";

export default (router: Router) => {
  router.get("/job-queues", getAllJobsController);
};

import { Router } from "express";
import productsRoute from "./products.route";
import jobQueuesRoute from "./jobQueues.route";
import dashboardRoute from "./dashboard.route";

const router = Router();

export default (): Router => {
  productsRoute(router);
  jobQueuesRoute(router);
  dashboardRoute(router);
  return router;
};

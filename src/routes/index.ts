import { Router } from "express";
import productsRoute from "./products.route";
import jobQueuesRoute from "./jobQueues.route";

const router = Router();

export default (): Router => {
  productsRoute(router);
  jobQueuesRoute(router);
  return router;
};

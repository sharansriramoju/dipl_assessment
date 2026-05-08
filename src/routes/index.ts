import { Router } from "express";
import productsRoute from "./products.route";

const router = Router();

export default (): Router => {
  productsRoute(router);
  return router;
};

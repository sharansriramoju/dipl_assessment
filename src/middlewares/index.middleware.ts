import express from "express";
import "dotenv/config";

export const validate =
  (schema: any) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
      return;
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message:
          JSON.parse(err.message)[0].message +
            " at " +
            JSON.parse(err.message)[0].path || "Invalid request data",
      });
    }
  };

export const validateQuery =
  (schema: any) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      schema.parse(req.query);
      next();
      return;
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message:
          JSON.parse(err.message)[0].message +
            " at " +
            JSON.parse(err.message)[0].path || "Invalid query parameters",
      });
    }
  };

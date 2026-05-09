import XLSX from "xlsx";
import { bulkUploadProductsSchema } from "../validations/products.validation";
import { ApiError } from "../errors/ApiError";
import {
  addCategoryRepository,
  addProductCategoryRepository,
  addProductRepository,
  getLatestRunningJobQueueRepository,
  getProductsRepository,
} from "../database/repositories/products.repository";
import sequelize from "../database/sequelize";
import { addReviewRepository } from "../database/repositories/reviews.repository";
import { ImportProgress, importQueue, ProductsPayload } from "../jobs/queue";
import { addJobQueue } from "../database/repositories/jobQueues.repository";

export const bulkUploadProductsService = async (file: Express.Multer.File) => {
  if (
    file.originalname.split(".").pop() !== "xlsx" &&
    file.originalname.split(".").pop() !== "xls"
  ) {
    throw new ApiError(
      400,
      "Invalid file type. Only XLSX and XLS files are allowed",
    );
  }
  const workbook = XLSX.read(file.buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data: any[] = XLSX.utils.sheet_to_json(worksheet);
  try {
    bulkUploadProductsSchema.parse(data);
  } catch (err: any) {
    throw new ApiError(
      400,
      JSON.parse(err.message)[0].message +
        " at " +
        JSON.parse(err.message)[0].path || "Invalid request data",
    );
  }
  const job = await importQueue.add(
    "products-import",
    <ProductsPayload>{
      products: data,
    },
    {
      removeOnComplete: true,
      removeOnFail: false,
    },
  );
  await addJobQueue({
    job_id: job.id!,
    file_name: file.originalname,
  });
};

export const addProductServiceForBulkUpload = async (product: {
  product_id: string;
  product_name: string;
  category: string;
  discounted_price: number;
  actual_price: number;
  discount_percentage: number;
  rating: number;
  rating_count?: number;
  about_product: string;
  user_name: string;
  review_title: string;
  review_content: string;
}) => {
  await sequelize.transaction(async (t) => {
    await addProductRepository(
      {
        product_id: product.product_id,
        product_name: product.product_name,
        description: product.about_product,
        discounted_price: product.discounted_price,
        actual_price: product.actual_price,
        discount_percentage: product.discount_percentage,
        rating: product.rating,
        rating_count: product.rating_count,
      },
      t,
    );
    for (const element of product.category.split("|")) {
      const category = await addCategoryRepository(element, t);
      await addProductCategoryRepository(
        product.product_id,
        category.category_id,
        t,
      );
    }
    const users = product.user_name.split(",");
    const review_titles = product.review_title.split(",");
    const review_contents = product.review_content.split(",");
    for (let i = 0; i < users.length; i++) {
      await addReviewRepository(
        {
          product_id: product.product_id,
          user_name: users[i],
          review_title: review_titles[i] || "",
          review_content: review_contents[i] || "",
        },
        t,
      );
    }
  });
};

export const getLatestBulkUploadJobStatusService = async () => {
  return await sequelize.transaction(async (t) => {
    const dbJob = await getLatestRunningJobQueueRepository(t);
    if (dbJob?.status == "pending") {
      const job = await importQueue.getJob(dbJob?.job_id as string);
      if (job) {
        const state = await job.getState(); // waiting | active | completed | failed | delayed

        console.log("Job state:", state);

        // v5 style: use properties
        const progressValue = job.progress as number | object;
        console.log("Job progress:", progressValue);
        const data = job.data as ProductsPayload;
        console.log("Job data:", data);

        const snapshot: ImportProgress = data._progress ?? {
          total: 0,
          processed: 0,
          succeeded: 0,
          failed: 0,
          percent:
            typeof progressValue === "number"
              ? progressValue
              : Number(progressValue as any) || 0,
          done: state === "completed",
          errors: [],
        };
        dbJob!.result = undefined;
        return {
          ...dbJob.dataValues,
          result: {
            state,
            progress: snapshot,
            returnValue: state === "completed" ? job.returnvalue : null,
            failedReason: job.failedReason ?? null,
          },
        };
      } else {
        return dbJob;
      }
    } else {
      return dbJob;
    }
  });
};

export const getAllProductsService = async (query: {
  page?: string;
  limit?: string;
  search?: string;
  category_id?: string;
  start_rating?: string;
  end_rating?: string;
  start_discounted_price?: string;
  end_discounted_price?: string;
  start_actual_price?: string;
  end_actual_price?: string;
  start_rating_count?: string;
  end_rating_count?: string;
}) => {
  return await sequelize.transaction(async (t) => {
    const page = query.page ? parseInt(query.page) : 1;
    const limit = query.limit ? parseInt(query.limit) : 10;
    const offset = (page - 1) * limit;
    return await getProductsRepository(
      {
        offset,
        limit,
        search: query.search,
        category_id: query.category_id,
        start_rating: query.start_rating
          ? parseFloat(query.start_rating)
          : undefined,
        end_rating: query.end_rating ? parseFloat(query.end_rating) : undefined,
        start_discounted_price: query.start_discounted_price
          ? parseFloat(query.start_discounted_price)
          : undefined,
        end_discounted_price: query.end_discounted_price
          ? parseFloat(query.end_discounted_price)
          : undefined,
        start_actual_price: query.start_actual_price
          ? parseFloat(query.start_actual_price)
          : undefined,
        end_actual_price: query.end_actual_price
          ? parseFloat(query.end_actual_price)
          : undefined,
        start_rating_count: query.start_rating_count
          ? parseFloat(query.start_rating_count)
          : undefined,
        end_rating_count: query.end_rating_count
          ? parseFloat(query.end_rating_count)
          : undefined,
      },
      t,
    );
  });
};

import { Transaction } from "sequelize";
import { getAllJobQueues } from "../database/repositories/jobQueues.repository";
import { sequelize } from "../database/models";

export const getAllJobQueuesService = async (
  query: {
    page?: string;
    limit?: string;
    status?: string;
  },
  t?: Transaction,
) => {
  return await sequelize.transaction(async (t) => {
    const page = query.page ? parseInt(query.page) : 1;
    const limit = query.limit ? parseInt(query.limit) : 10;
    const offset = (page - 1) * limit;
    return await getAllJobQueues(
      {
        limit,
        offset,
      },
      query.status,
      t,
    );
  });
};

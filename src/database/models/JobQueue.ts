import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../sequelize";

interface JobQueueAttributes {
  job_id: string;
  status?: string;
  result?: object;
  file_name?: string;
  created_at?: Date;
}

interface JobQueueCreationAttributes extends Optional<
  JobQueueAttributes,
  "job_id" | "created_at"
> {}

class JobQueue
  extends Model<JobQueueAttributes, JobQueueCreationAttributes>
  implements JobQueueAttributes
{
  public job_id!: string;
  public status?: string;
  public result?: object;
  public file_name?: string;
  public created_at?: Date;
}

JobQueue.init(
  {
    job_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "pending",
    },
    result: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    file_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal(
        "(CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata'::text)",
      ),
    },
  },
  {
    sequelize,
    tableName: "job_queues",
    modelName: "JobQueue",
    timestamps: false,
  },
);

export default JobQueue;

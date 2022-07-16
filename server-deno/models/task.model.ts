import { Bson } from "https://deno.land/x/mongo@v0.29.4/mod.ts";

import db from "../db/mongodb.ts";

interface TaskSchema {
  _id: Bson.ObjectId;
  taskId: string;
  name: string;
  description: string;
  createdBy: string;
  assignees: string[];
  categories: string[];
  createdAt: Date;
  deadline: Date;
}

const TaskModel = db.collection<TaskSchema>("tasks");

export { TaskModel };

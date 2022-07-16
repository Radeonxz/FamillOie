import { Bson } from "https://deno.land/x/mongo@v0.29.4/mod.ts";

import db from "../db/mongodb.ts";

interface CategorySchema {
  _id: Bson.ObjectId;
  categoryId: string;
  name: string;
  description: string;
  createdBy: string;
  homes: string[];
  createdAt: Date;
  deadline: Date;
}

const CategoryModel = db.collection<CategorySchema>("categories");

export { CategoryModel };

import { Bson } from "https://deno.land/x/mongo@v0.29.4/mod.ts";

import db from "../db/mongodb.ts";

interface HomeSchema {
  _id: Bson.ObjectId;
  homeId: string;
  name: string;
  description: string;
  createdBy: string;
  members: string[];
  createdAt: Date;
}

const HomeModel = db.collection<HomeSchema>("homes");

export { HomeModel };

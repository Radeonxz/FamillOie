import { Bson } from "https://deno.land/x/mongo@v0.29.4/mod.ts";

import db from "../db/mongodb.ts";

interface UserSchema {
  _id: Bson.ObjectId;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

const UserModel = db.collection<UserSchema>("users");

export { UserModel };

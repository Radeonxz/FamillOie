import { UserModel } from "../models/models.ts";

const createUser = async (userObj: any) => {
  const userId = await UserModel.insertOne(userObj);
  return userId;
};

export { createUser };

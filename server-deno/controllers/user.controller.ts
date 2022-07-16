import { UserModel } from "../models/models.ts";

const createUser = async (userObj: any) => {
  const userId = crypto.randomUUID();
  await UserModel.insertOne({ ...userObj, userId });
  return userId;
};

const updateUserById = async (userId: string, userObj: any) => {
  const updatedUser = await UserModel.updateOne(
    { userId },
    { $set: { ...userObj } }
  );
  return updatedUser;
};

const findUserById = async (userId: string) => {
  const user = await UserModel.findOne({ userId });
  return user;
};

const deleteUserById = async (userId: string) => {
  const deleteCount = await UserModel.deleteOne({ userId });
  return deleteCount;
};

export { createUser, updateUserById, findUserById, deleteUserById };

import { HomeModel } from "../models/home.model.ts";

const createHome = async (homeObj: any) => {
  const homeId = crypto.randomUUID();
  await HomeModel.insertOne({ ...homeObj, homeId });
  return homeId;
};

const updateHomeById = async (homeId: string, homeObj: any) => {
  const updatedUser = await HomeModel.updateOne(
    { homeId },
    { $set: { ...homeObj } }
  );
  return updatedUser;
};

const findHomeById = async (homeId: string) => {
  const home = await HomeModel.findOne({ homeId });
  return home;
};

const deleteHomeById = async (homeId: string) => {
  const deleteCount = await HomeModel.deleteOne({ homeId });
  return deleteCount;
};

export { createHome, updateHomeById, findHomeById, deleteHomeById };

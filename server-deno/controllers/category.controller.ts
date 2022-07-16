import { CategoryModel } from "../models/models.ts";

const createCategory = async (categoryObj: any) => {
  const categoryId = crypto.randomUUID();
  await CategoryModel.insertOne({ ...categoryObj, categoryId });
  return categoryId;
};

const updateCategoryById = async (categoryId: string, categoryObj: any) => {
  const updatedUser = await CategoryModel.updateOne(
    { categoryId },
    { $set: { ...categoryObj } }
  );
  return updatedUser;
};

const findCategoryById = async (categoryId: string) => {
  const category = await CategoryModel.findOne({ categoryId });
  return category;
};

const deleteCategoryById = async (categoryId: string) => {
  const deleteCount = await CategoryModel.deleteOne({ categoryId });
  return deleteCount;
};

export {
  createCategory,
  updateCategoryById,
  findCategoryById,
  deleteCategoryById
};

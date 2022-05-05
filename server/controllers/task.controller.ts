import { TaskModel } from "../models/model.ts";

const createTask = async (taskObj: any) => {
  const taskId = crypto.randomUUID();
  await TaskModel.insertOne({ ...taskObj, taskId });
  return taskId;
};

const updateTaskById = async (taskId: string, taskObj: any) => {
  const updatedUser = await TaskModel.updateOne(
    { taskId },
    { $set: { ...taskObj } }
  );
  return updatedUser;
};

const findTaskById = async (taskId: string) => {
  const task = await TaskModel.findOne({ taskId });
  return task;
};

const deleteTaskById = async (taskId: string) => {
  const deleteCount = await TaskModel.deleteOne({ taskId });
  return deleteCount;
};

export { createTask, updateTaskById, findTaskById, deleteTaskById };

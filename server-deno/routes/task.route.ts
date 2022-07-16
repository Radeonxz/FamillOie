import {
  Router,
  Status,
  helpers
} from "https://deno.land/x/oak@v10.5.1/mod.ts";

import {
  createTask,
  updateTaskById,
  findTaskById,
  deleteTaskById
} from "../controllers/controllers.ts";

const taskRouter: Router = new Router();

taskRouter.post("/", async (ctx: any) => {
  try {
    const taskData = await ctx.request.body().value;
    const taskId = await createTask(taskData);
    ctx.response.body = { ...taskData, taskId };
  } catch (error) {
    ctx.response.status = Status.InternalServerError;
  }
});

taskRouter.put("/:taskId", async (ctx: any) => {
  try {
    const { taskId } = helpers.getQuery(ctx, { mergeParams: true });
    const taskData = await ctx.request.body().value;
    const task = await updateTaskById(taskId, taskData);
    ctx.response.body = { ...task };
  } catch (error) {
    ctx.response.status = Status.NotFound;
  }
});

taskRouter.get("/:taskId", async (ctx: any) => {
  try {
    const { taskId } = helpers.getQuery(ctx, { mergeParams: true });
    const task = await findTaskById(taskId);
    const taskObj = { ...task };
    delete taskObj["_id"];
    ctx.response.body = { ...taskObj };
  } catch (error) {
    ctx.response.status = Status.NotFound;
  }
});

taskRouter.delete("/:taskId", async (ctx: any) => {
  try {
    const { taskId } = helpers.getQuery(ctx, { mergeParams: true });
    const deleteCount = await deleteTaskById(taskId);
    ctx.response.body = { deleteCount };
  } catch (error) {
    ctx.response.status = Status.NotFound;
  }
});

export default taskRouter;

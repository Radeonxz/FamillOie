import {
  Router,
  Status,
  helpers
} from "https://deno.land/x/oak@v10.5.1/mod.ts";

import {
  createCategory,
  updateCategoryById,
  findCategoryById,
  deleteCategoryById
} from "../controllers/controllers.ts";
import taskRouter from "./task.route.ts";

const categoryRouter: Router = new Router();

categoryRouter.use("/task", taskRouter.routes(), taskRouter.allowedMethods());

categoryRouter.post("/", async (ctx: any) => {
  try {
    const categoryData = await ctx.request.body().value;
    const categoryId = await createCategory(categoryData);
    ctx.response.body = { ...categoryData, categoryId };
  } catch (error) {
    ctx.response.status = Status.InternalServerError;
  }
});

categoryRouter.put("/:categoryId", async (ctx: any) => {
  try {
    const { categoryId } = helpers.getQuery(ctx, { mergeParams: true });
    const categoryData = await ctx.request.body().value;
    const category = await updateCategoryById(categoryId, categoryData);
    ctx.response.body = { ...category };
  } catch (error) {
    ctx.response.status = Status.NotFound;
  }
});

categoryRouter.get("/:categoryId", async (ctx: any) => {
  try {
    const { categoryId } = helpers.getQuery(ctx, { mergeParams: true });
    const category = await findCategoryById(categoryId);
    const categoryObj = { ...category };
    delete categoryObj["_id"];
    ctx.response.body = { ...categoryObj };
  } catch (error) {
    ctx.response.status = Status.NotFound;
  }
});

categoryRouter.delete("/:categoryId", async (ctx: any) => {
  try {
    const { categoryId } = helpers.getQuery(ctx, { mergeParams: true });
    const deleteCount = await deleteCategoryById(categoryId);
    ctx.response.body = { deleteCount };
  } catch (error) {
    ctx.response.status = Status.NotFound;
  }
});

export default categoryRouter;

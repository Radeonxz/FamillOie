import {
  Router,
  Status,
  helpers
} from "https://deno.land/x/oak@v10.5.1/mod.ts";

import {
  createUser,
  updateUserById,
  findUserById,
  deleteUserById
} from "../controllers/controllers.ts";

const userRouter: Router = new Router();

userRouter.post("/", async (ctx: any) => {
  try {
    const userData = await ctx.request.body().value;
    const userId = await createUser(userData);
    ctx.response.body = { ...userData, userId };
  } catch (error) {
    ctx.response.status = Status.InternalServerError;
  }
});

userRouter.put("/:userId", async (ctx: any) => {
  try {
    const { userId } = helpers.getQuery(ctx, { mergeParams: true });
    const userData = await ctx.request.body().value;
    const user = await updateUserById(userId, userData);
    ctx.response.body = { ...user };
  } catch (error) {
    ctx.response.status = Status.NotFound;
  }
});

userRouter.get("/:userId", async (ctx: any) => {
  try {
    const { userId } = helpers.getQuery(ctx, { mergeParams: true });
    const user = await findUserById(userId);
    const userObj = { ...user };
    delete userObj["_id"];
    ctx.response.body = { ...userObj };
  } catch (error) {
    ctx.response.status = Status.NotFound;
  }
});

userRouter.delete("/:userId", async (ctx: any) => {
  try {
    const { userId } = helpers.getQuery(ctx, { mergeParams: true });
    const deleteCount = await deleteUserById(userId);
    ctx.response.body = { deleteCount };
  } catch (error) {
    ctx.response.status = Status.NotFound;
  }
});

export default userRouter;

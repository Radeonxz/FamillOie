import {
  Router,
  Status,
  helpers
} from "https://deno.land/x/oak@v10.5.1/mod.ts";

import {
  createHome,
  updateHomeById,
  findHomeById,
  deleteHomeById
} from "../controllers/controllers.ts";

const homeRouter: Router = new Router();

homeRouter.post("/", async (ctx: any) => {
  try {
    const request = ctx.request;
    const homeData = await request.body().value;
    const homeId = await createHome(homeData);
    ctx.response.body = { ...homeData, homeId };
  } catch (error) {
    ctx.response.status = Status.InternalServerError;
  }
});

homeRouter.put("/:homeId", async (ctx: any) => {
  try {
    const { homeId } = helpers.getQuery(ctx, { mergeParams: true });
    const homeData = await ctx.request.body().value;
    const home = await updateHomeById(homeId, homeData);
    ctx.response.body = { ...home };
  } catch (error) {
    ctx.response.status = Status.NotFound;
  }
});

homeRouter.get("/:homeId", async (ctx: any) => {
  try {
    const { homeId } = helpers.getQuery(ctx, { mergeParams: true });
    const home = await findHomeById(homeId);
    const homeObj = { ...home };
    delete homeObj["_id"];
    ctx.response.body = { ...homeObj };
  } catch (error) {
    ctx.response.status = Status.NotFound;
  }
});

homeRouter.delete("/:homeId", async (ctx: any) => {
  try {
    const { homeId } = helpers.getQuery(ctx, { mergeParams: true });
    const deleteCount = await deleteHomeById(homeId);
    ctx.response.body = { deleteCount };
  } catch (error) {
    ctx.response.status = Status.NotFound;
  }
});

export default homeRouter;

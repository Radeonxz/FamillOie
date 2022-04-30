import { Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";

import { createUser } from "../controllers/controllers.ts";

const appRouter: Router = new Router();

appRouter.get("/", (ctx: any) => {
  ctx.response.body = "index route";
});

appRouter.post("/user", async (ctx: any) => {
  const request = ctx.request;
  const userData = await request.body().value;
  const userId = await createUser(userData);
  ctx.response.body = { userId, userData };
});

export default appRouter;

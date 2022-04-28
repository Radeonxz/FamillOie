import { Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";

const appRouter: Router = new Router();

appRouter.get("/", (ctx: any) => {
  ctx.response.body = "index route";
});

export default appRouter;

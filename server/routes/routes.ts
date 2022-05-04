import { Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";

import userRouter from "./user.route.ts";
import homeRouter from "./home.route.ts";

const appRouter: Router = new Router();

appRouter.get("/", (ctx: any) => {
  ctx.response.body = "index route";
});

appRouter.use("/user", userRouter.routes(), userRouter.allowedMethods());
appRouter.use("/home", homeRouter.routes(), homeRouter.allowedMethods());

export default appRouter;

import { Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";

import categoryRouter from "./category.route.ts";
import homeRouter from "./home.route.ts";
import userRouter from "./user.route.ts";

const appRouter: Router = new Router();

appRouter.get("/", (ctx: any) => {
  ctx.response.body = "index route";
});

appRouter.use(
  "/category",
  categoryRouter.routes(),
  categoryRouter.allowedMethods()
);
appRouter.use("/home", homeRouter.routes(), homeRouter.allowedMethods());
appRouter.use("/user", userRouter.routes(), userRouter.allowedMethods());

export default appRouter;

import { Application } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

import * as middlewares from "./middlewares/middlewares.ts";
import appRouter from "./routes/routes.ts";
import { config } from "./config/config.ts";

// Init app server
const app = new Application();

// Add CORS
app.use(oakCors());

// Add middlewares
app.use(middlewares.loggerMiddleware);
app.use(middlewares.timingMiddleware);

// Routes and methods setup
app.use(appRouter.routes());
app.use(appRouter.allowedMethods());

console.log(`Server is running on PORT: 8000.`);
await app.listen({ port: 8000 });

import { Context } from "../types/context.ts";

const loggerMiddleware = async (ctx: Context, next: any) => {
  await next();
  const reqTime = ctx.response.headers.get("X-Response-Time");
  const status = ctx.response.status;
  const pathname = new URL(ctx.request.url.toString()).pathname;
  console.log(
    `${ctx.request.method} ${pathname} - ${reqTime} status: ${status}`
  );
};

export { loggerMiddleware };

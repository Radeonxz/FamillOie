import { Context } from "../types/context.ts";

const timingMiddleware = async (ctx: Context, next: any) => {
  const reqStart = Date.now();
  await next();
  const diffInMs = Date.now() - reqStart;
  ctx.response.headers.set("X-Response-Time", `${diffInMs}ms`);
};

export { timingMiddleware };

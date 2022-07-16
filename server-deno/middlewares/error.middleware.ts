import { isHttpError, Status } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import { config } from "./../config/config.ts";
import { Context } from "./../types.ts";

const errorMiddleware = async (ctx: Context, next: any) => {
  try {
    await next();
  } catch (err) {
    let message = err.message;
    const status = err.status || err.statusCode || Status.InternalServerError;

    if (!isHttpError(err)) {
      message =
        config.ENV === "dev" || config.ENV === "development"
          ? message
          : "Internal Server Error";
    }

    if (config.ENV === "dev" || config.ENV === "development") {
      console.log(err);
    }

    ctx.response.status = status;
    ctx.response.body = { status, message };
  }
};

export { errorMiddleware };

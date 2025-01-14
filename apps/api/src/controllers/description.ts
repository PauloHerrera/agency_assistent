import type { Context, Next } from "koa";

async function getDescription(ctx: Context, next: Next) {
  ctx.body = "Hello World!";
  await next();
}

export { getDescription };

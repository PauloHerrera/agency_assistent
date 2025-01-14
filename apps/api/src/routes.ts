import Router from "koa-router";
import { getDescription } from "./controllers/description";
import { postBlogPost } from "./controllers/blog-post";

const router = new Router();

router.get("/descriptor", getDescription);
router.post("/blog-post", postBlogPost);

router.get("/", (ctx, next) => {
  ctx.body = "Hello World!";
  ctx.status = 200;
  next();
});

export { router };

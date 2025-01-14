import type { Context, Next } from "koa";
import { z } from "zod";
import { OpenIA } from "../infra/ia/open-ia";
import { BlogCreatorService } from "../services/blog-creator-service";

const blogPostSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  content: z.string().optional(),
});

async function postBlogPost(ctx: Context, next: Next) {
  const result = blogPostSchema.safeParse(ctx.request.body);

  if (!result.success) {
    ctx.status = 400;
    ctx.body = {
      error: result.error.errors[0].message,
      details: result.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })),
    };
    return;
  }

  try {
    const { title, content } = result.data;

    const blogCreator = new BlogCreatorService(new OpenIA());
    const blogPost = await blogCreator.createBlogPost(title, content);

    ctx.body = {
      content: blogPost,
    };
    ctx.status = 200;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = {
      error: "Erro ao gerar o blog post",
    };
  }

  await next();
}

export { postBlogPost };

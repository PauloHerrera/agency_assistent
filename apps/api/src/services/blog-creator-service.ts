import { file } from "bun";
import type { BaseIA } from "../infra/ia/base-ia";

export class BlogCreatorService {
  constructor(private readonly assistent: BaseIA) {}

  public async createBlogPost(
    title: string,
    content?: string
  ): Promise<string> {
    let prompt = `Title: ${title}`;

    if (content) {
      prompt += `\nContent: ${content}`;
    }

    const systemPrompt = await file(
      `${import.meta.dir}/../infra/ia/docs/blog-system-prompt.txt`
    ).text();

    const blogPost = await this.assistent.generateContent(prompt, systemPrompt);

    return blogPost;
  }
}

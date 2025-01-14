import OpenAI from "openai";
import type { BaseIA } from "./base-ia";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions.mjs";

class OpenIA implements BaseIA {
	private openai: OpenAI;
	private messages: ChatCompletionMessageParam[] = [];

	constructor() {
		this.openai = new OpenAI({
			apiKey: process.env.OPEN_AI_KEY,
		});
	}

	public async generateContent(
		prompt: string,
		systemPrompt?: string,
	): Promise<string> {
		if (systemPrompt) {
			this.messages.push({
				role: "system",
				content: systemPrompt,
			});
		}

		this.messages.push({
			role: "user",
			content: prompt,
		});

		// Check if the prompt is allowed or violates the OpenAI content policy
		const isAllowed = await this.checkPrompt(prompt);

		if (!isAllowed) {
			throw new Error("Prompt is not allowed");
		}

		const response = await this.openai.chat.completions.create({
			model: process.env.OPEN_AI_MODEL || "gpt-4o-mini",
			messages: this.messages,
			temperature: 1,
		});

		this.messages.push(response.choices[0].message);

		console.log(response);

		return response.choices[0].message.content || "";
	}

	private async checkPrompt(prompt: string): Promise<boolean> {
		const moderation = await this.openai.moderations.create({
			model: "omni-moderation-latest",
			input: prompt,
		});

		return !moderation.results[0].flagged;
	}
}

export { OpenIA };

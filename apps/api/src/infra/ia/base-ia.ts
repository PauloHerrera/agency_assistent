export abstract class BaseIA {
	public abstract generateContent(
		prompt: string,
		systemPrompt?: string,
	): Promise<string>;
}

const defaultModel = "gpt-4.1-nano";
const defaultTimeoutMs = 15000;

export function getOpenAIModel(): string {
  return process.env.OPENAI_MODEL?.trim() || defaultModel;
}

export function getOpenAITimeoutMs(): number {
  return defaultTimeoutMs;
}

export function hasOpenAIKey(): boolean {
  return Boolean(process.env.OPENAI_API_KEY?.trim());
}

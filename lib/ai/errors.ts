import type { GenerateDeckErrorCode, GenerateDeckErrorResponse } from "@/types/ai";

type AIServiceErrorOptions = {
  retryable?: boolean;
  statusCode?: number;
};

export class AIServiceError extends Error {
  readonly code: GenerateDeckErrorCode;
  readonly retryable: boolean;
  readonly statusCode: number;

  constructor(
    code: GenerateDeckErrorCode,
    message: string,
    options: AIServiceErrorOptions = {},
  ) {
    super(message);
    this.name = "AIServiceError";
    this.code = code;
    this.retryable = options.retryable ?? false;
    this.statusCode = options.statusCode ?? 500;
  }
}

export function toErrorResponse(error: AIServiceError): GenerateDeckErrorResponse {
  return {
    code: error.code,
    message: error.message,
  };
}

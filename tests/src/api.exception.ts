import { validateMatch } from '@amakovskyi/api-auditor';

export class ApiException extends Error {
  readonly statusCode: number;
  readonly message: string;

  constructor(
    readonly data: {
      statusCode: number,
      message: string,
    },
  ) {
    super('ApiException ' + JSON.stringify(data));
    this.statusCode = data.statusCode;
    this.message = data.message;
  }
}

export function validateApiException(e: any, statusCode: number, message?: string) {
  if (e instanceof ApiException) {
    validateMatch(e.data, { statusCode, message });
  } else {
    throw e;
  }
}
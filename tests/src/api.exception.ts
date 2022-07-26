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
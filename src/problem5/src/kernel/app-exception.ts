import { HttpCode } from '../utils/http-code';
export class AppException extends Error {
  constructor(
    readonly status: HttpCode,
    readonly message: string,
    readonly rootErr?: Error,
  ) {
    super(message);
  }
}

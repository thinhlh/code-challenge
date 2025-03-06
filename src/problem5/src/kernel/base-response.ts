import { AppException } from './app-exception';

export class BaseResponse<T> {
  constructor(
    readonly data?: T,
    readonly error?: AppException,
  ) {}

  static success<T>(data: T) {
    return new BaseResponse(data, undefined);
  }

  static error(error: AppException) {
    return new BaseResponse(error, undefined);
  }
}

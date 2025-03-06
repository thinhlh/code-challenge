import { AppException } from '../kernel/app-exception';
import { HttpCode } from '../utils/http-code';

export class NotFoundException extends AppException {
  constructor(message: string) {
    super(HttpCode.NOT_FOUND, message);
  }
}

import { UnauthorizedException } from '@nestjs/common';

export class InvalidUserCredentialsException extends UnauthorizedException {
  constructor() {
    super('Wrong name or password. Please try again.');
  }
}

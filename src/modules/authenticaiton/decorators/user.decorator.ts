import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from '../types/interfaces/request-with-user.interface';
import { User } from '../../users/user.entity';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request: RequestWithUser = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

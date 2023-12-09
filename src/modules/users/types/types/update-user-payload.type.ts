import { User } from '../../user.entity';
import { CreateUserPayload } from './create-user-payload.type';

export type UpdateUserPayload = Partial<
  CreateUserPayload &
    Pick<User, 'refreshToken' | 'passwordHash' | 'passwordSalt'>
>;

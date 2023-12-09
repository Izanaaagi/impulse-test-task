import { User } from '../../user.entity';

type UserRegistrationPayload = { password: string };

export type CreateUserPayload = Pick<User, 'name'> & UserRegistrationPayload;

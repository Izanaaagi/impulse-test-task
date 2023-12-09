import { IsNotEmpty } from 'class-validator';
import { CreateUserPayload } from '../../users/types/types/create-user-payload.type';
import { UserPassword } from '../decorators/validations/user-password.decorator';
import { UserName } from '../decorators/validations/user-name.decorator';

export class RegisterUserDto implements CreateUserPayload {
  @UserName()
  @IsNotEmpty()
  name: string;

  @UserPassword()
  @IsNotEmpty()
  password: string;
}

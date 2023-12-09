import { IsNotEmpty } from 'class-validator';
import { UserName } from '../decorators/validations/user-name.decorator';
import { UserPassword } from '../decorators/validations/user-password.decorator';

export class LoginDto {
  @UserName()
  @IsNotEmpty()
  name: string;

  @UserPassword()
  @IsNotEmpty()
  password: string;
}

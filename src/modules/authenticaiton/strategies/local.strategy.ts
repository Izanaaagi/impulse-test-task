import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { AuthenticationService } from '../authentication.service';
import { User } from '../../users/user.entity';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      usernameField: 'name',
      passwordField: 'password',
    });
  }

  async validate(name: string, password: string): Promise<User> {
    return this.authenticationService.getAuthenticatedUser(name, password);
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccessTokenPayload } from '../types/interfaces/access-token-payload.interface';
import { User } from '../../users/user.entity';
import { UsersService } from '../../users/users.service';
import { UserAuthConfig } from '../../../common/config/user-jwt/types/interfaces/user-auth-config.interface';
import { ConfigTokens } from '../../../common/config/config-tokens.enum';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<UserAuthConfig>(ConfigTokens.USER_AUTH)
        .accessTokenSecret,
    });
  }

  async validate({ id }: AccessTokenPayload): Promise<User> {
    return this.usersService.getById(id);
  }
}

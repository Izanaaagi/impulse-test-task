import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { IncomingHttpHeaders } from 'http';
import { AccessTokenPayload } from '../types/interfaces/access-token-payload.interface';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/user.entity';
import { UserAuthConfig } from '../../../common/config/user-jwt/types/interfaces/user-auth-config.interface';
import { ConfigTokens } from '../../../common/config/config-tokens.enum';
import { RequestWithUser } from '../types/interfaces/request-with-user.interface';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<UserAuthConfig>(ConfigTokens.USER_AUTH)
        .refreshTokenSecret,
      passReqToCallback: true,
    });
  }

  async validate(
    req: RequestWithUser,
    payload: AccessTokenPayload,
  ): Promise<User> {
    const token = this.extractTokenFromHeaders(req.headers);

    try {
      return await this.usersService.getIfByRefreshToken(payload.id, token);
    } catch {
      return null;
    }
  }

  private extractTokenFromHeaders(headers: IncomingHttpHeaders): string {
    return headers.authorization?.split(' ')[1];
  }
}

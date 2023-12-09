import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InvalidUserCredentialsException } from './exceptions/invalid-user-credentials.exception';
import { AccessTokenPayload } from './types/interfaces/access-token-payload.interface';
import { TokensDto } from './dtos/tokens.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { UserAuthConfig } from '../../common/config/user-jwt/types/interfaces/user-auth-config.interface';
import { ConfigTokens } from '../../common/config/config-tokens.enum';
import { CreateUserPayload } from '../users/types/types/create-user-payload.type';

@Injectable()
export class AuthenticationService {
  private readonly accessTokenSecret: string;
  private readonly accessTokenExpirationMs: string;
  private readonly refreshTokenSecret: string;
  private readonly refreshTokenExpirationMs: string;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    const {
      accessTokenSecret,
      accessTokenTTL,
      refreshTokenSecret,
      refreshTokenTTL,
    } = this.configService.get<UserAuthConfig>(ConfigTokens.USER_AUTH);

    this.accessTokenSecret = accessTokenSecret;
    this.accessTokenExpirationMs = accessTokenTTL;
    this.refreshTokenSecret = refreshTokenSecret;
    this.refreshTokenExpirationMs = refreshTokenTTL;
  }

  async signup(payload: CreateUserPayload): Promise<User> {
    return this.usersService.create(payload);
  }

  async getTokens(userId: string): Promise<TokensDto> {
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    await this.usersService.update(userId, { refreshToken });

    return { accessToken, refreshToken };
  }

  private async generateTokens(id: string): Promise<TokensDto> {
    const payload: AccessTokenPayload = {
      id,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.accessTokenSecret,
        expiresIn: this.accessTokenExpirationMs,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.refreshTokenSecret,
        expiresIn: this.refreshTokenExpirationMs,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async getAuthenticatedUser(name: string, password: string): Promise<User> {
    try {
      const user = await this.usersService.getByName(name);
      await this.verifyPassword(user, password);
      return user;
    } catch {
      throw new InvalidUserCredentialsException();
    }
  }

  async logout(userId: string): Promise<void> {
    await this.usersService.update(userId, { refreshToken: null });
  }

  private async verifyPassword(user: User, password: string): Promise<void> {
    const isMatch = await this.usersService.comparePassword(user, password);

    console.log(isMatch);

    if (!isMatch) {
      throw new InvalidUserCredentialsException();
    }
  }
}

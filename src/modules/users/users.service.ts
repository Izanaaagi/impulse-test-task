import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserPayload } from './types/types/create-user-payload.type';
import { HashService } from '../../common/hash-service/hash.service';
import { PasswordHash } from './types/interfaces/password-hash.interface';
import { UpdateUserPayload } from './types/types/update-user-payload.type';
import { UserAuthConfig } from '../../common/config/user-jwt/types/interfaces/user-auth-config.interface';
import { ConfigTokens } from '../../common/config/config-tokens.enum';

@Injectable()
export class UsersService {
  private readonly passwordSaltRounds: number;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashService: HashService,
    private readonly configService: ConfigService,
  ) {
    this.passwordSaltRounds = this.configService.get<UserAuthConfig>(
      ConfigTokens.USER_AUTH,
    ).passwordSaltRounds;
  }

  async create({ name, password }: CreateUserPayload): Promise<User> {
    const { hash, salt } = await this.hashPassword(password);

    const user = await this.userRepository.save({
      name,
      passwordHash: hash,
      passwordSalt: salt,
    });

    return this.getById(user.id);
  }

  async update(userId: string, payload: UpdateUserPayload): Promise<User> {
    await this.userRepository.update(userId, payload);

    return this.getById(userId);
  }

  async getById(userId: string): Promise<User> {
    return this.userRepository.findOneOrFail({ where: { id: userId } });
  }

  async getByName(name: string): Promise<User> {
    return this.userRepository.findOneOrFail({ where: { name } });
  }

  async getIfByRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<User> {
    return this.userRepository.findOneOrFail({
      where: { id: userId, refreshToken },
    });
  }

  async comparePassword(user: User, password: string): Promise<boolean> {
    return this.hashService.compare(password, user.passwordHash);
  }

  private async hashPassword(password: string): Promise<PasswordHash> {
    const salt: string = await this.hashService.generateSalt(
      this.passwordSaltRounds,
    );
    const hash: string = await this.hashService.hash(password, salt);

    return { salt, hash };
  }
}

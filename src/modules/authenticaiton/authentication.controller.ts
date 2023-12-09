import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { TokensDto } from './dtos/tokens.dto';
import { LoginDto } from './dtos/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthUser } from './decorators/user.decorator';
import { User } from '../users/user.entity';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { RegisterUserDto } from './dtos/register-user.dto';
import { DetailedUserDto } from '../users/dtos/detailed-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Serialize } from '../../common/decorators/serialize.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register user' })
  @ApiBody({ type: RegisterUserDto })
  @ApiCreatedResponse({ type: DetailedUserDto })
  @Serialize(DetailedUserDto)
  @ApiBadRequestResponse()
  signup(@Body() dto: RegisterUserDto): Promise<User> {
    return this.authenticationService.signup(dto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Get tokens' })
  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({ type: TokensDto })
  @Serialize(TokensDto)
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  login(@AuthUser() user: User): Promise<TokensDto> {
    return this.authenticationService.getTokens(user.id);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Remove refresh token' })
  @ApiBearerAuth()
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiUnauthorizedResponse()
  logout(@AuthUser() user: User): Promise<void> {
    return this.authenticationService.logout(user.id);
  }

  @Patch('refresh')
  @UseGuards(JwtRefreshGuard)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: TokensDto })
  @ApiUnauthorizedResponse()
  @Serialize(TokensDto)
  refreshTokens(@AuthUser() user: User): Promise<TokensDto> {
    return this.authenticationService.getTokens(user.id);
  }
}

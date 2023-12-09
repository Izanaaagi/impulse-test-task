import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DetailedUserDto } from './dtos/detailed-user.dto';
import { Serialize } from '../../common/decorators/serialize.decorator';
import { AuthUser } from '../authenticaiton/decorators/user.decorator';
import { JwtAuthGuard } from '../authenticaiton/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  @Get('me')
  @ApiOperation({ summary: 'Get own profile' })
  @ApiCreatedResponse({ type: DetailedUserDto })
  @ApiUnauthorizedResponse()
  @Serialize(DetailedUserDto)
  create(@AuthUser() user: User): User {
    return user;
  }
}

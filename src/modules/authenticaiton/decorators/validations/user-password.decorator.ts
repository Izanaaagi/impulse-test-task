import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { TrimString } from '../../../../common/decorators/transforms/trim-string.decorator';

export const UserPassword = () =>
  applyDecorators(
    ApiProperty({ description: 'Password' }),
    Length(8, 32),
    TrimString(),
    IsString(),
  );

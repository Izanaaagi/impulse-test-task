import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { TrimString } from '../../../../common/decorators/transforms/trim-string.decorator';

export const UserName = () =>
  applyDecorators(
    ApiProperty({ description: 'Name' }),
    Length(2, 32),
    TrimString(),
  );

import { BaseExceptionFilter } from '@nestjs/core';
import {
  ArgumentsHost,
  Catch,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { DatabaseError } from '../database/types/enums/database-error.enum';

@Catch(QueryFailedError)
export class UniqueViolationFilter extends BaseExceptionFilter {
  public async catch(exception: any, host: ArgumentsHost): Promise<any> {
    if (exception.code === DatabaseError.UNIQUE_VIOLATION) {
      const entity: string = this.getEntityName(exception.table);

      const errorMessage: string = exception.detail
        .replace(/"/g, '')
        .replace('Key', `${entity} with`);

      super.catch(new ConflictException(errorMessage), host);
    }

    super.catch(new InternalServerErrorException(), host);
  }

  private getEntityName(table: string): string {
    return (table.charAt(0).toUpperCase() + table.slice(1))
      .replaceAll('_', ' ')
      .replace('entity', '');
  }
}

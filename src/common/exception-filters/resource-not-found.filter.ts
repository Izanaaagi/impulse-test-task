import { BaseExceptionFilter } from '@nestjs/core';
import { ArgumentsHost, Catch, NotFoundException } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';

@Catch(EntityNotFoundError)
export class ResourceNotFoundFilter extends BaseExceptionFilter {
  public async catch(
    exception: EntityNotFoundError,
    host: ArgumentsHost,
  ): Promise<any> {
    const entityName = this.getEntityNameFromMessage(exception.message);
    super.catch(new NotFoundException(`${entityName} not found`), host);
  }

  private getEntityNameFromMessage(message: string): string {
    return message.split('"')[1];
  }
}

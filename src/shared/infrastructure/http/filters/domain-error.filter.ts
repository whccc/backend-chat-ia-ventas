import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { DomainError } from 'src/shared/domain/errors/domain.error';

@Catch(DomainError)
export class DomainErrorFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const statusCode = this.getStatusCode(exception);

    response.status(statusCode).json({
      statusCode,
      error: exception.name,
      message: exception.message,
    });
  }

  private getStatusCode(exception: DomainError): number {
    if (exception.category === 'conflict') {
      return HttpStatus.CONFLICT;
    }

    if (exception.category === 'validation') {
      return HttpStatus.BAD_REQUEST;
    }

    return HttpStatus.UNPROCESSABLE_ENTITY;
  }
}
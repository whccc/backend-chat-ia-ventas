import { DomainConflictError } from 'src/shared/domain/errors/domain-conflict.error';

export class UserEmailAlreadyExistsError extends DomainConflictError {
  constructor(email: string) {
    super(`User with email ${email} already exists`);
  }
}
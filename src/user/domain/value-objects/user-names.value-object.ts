import { DomainValidationError } from 'src/shared/domain/errors/domain-validation.error';

export class UserNames {
  private constructor(private readonly internalValue: string) {}

  static create(value: string): UserNames {
    const normalizedValue = value.trim().replace(/\s+/g, ' ');

    if (!normalizedValue) {
      throw new DomainValidationError('User name is required');
    }

    if (normalizedValue.length > 255) {
      throw new DomainValidationError('User name is too long');
    }

    return new UserNames(normalizedValue);
  }

  get value(): string {
    return this.internalValue;
  }
}

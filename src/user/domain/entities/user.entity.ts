import { CreateUserProps, UserProps } from '../interfaces/user.interface';
import { UserNames } from '../value-objects/user-names.value-object';
import { DomainValidationError } from 'src/shared/domain/errors/domain-validation.error';

export class User {
  private constructor(private props: UserProps) {}

  public static create(props: CreateUserProps): User {
    const now = new Date();

    return new User({
      id: crypto.randomUUID(),
      name: UserNames.create(props.name).value,
      email: this.normalizeEmail(props.email),
      password: this.validateStoredPassword(props.password),
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });
  }

  public static rehydrate(props: UserProps): User {
    return new User({
      ...props,
      name: UserNames.create(props.name).value,
      email: this.normalizeEmail(props.email),
      password: this.validateStoredPassword(props.password),
    });
  }

  public static ensurePasswordPolicy(password: string): void {
    if (password.trim().length < 6) {
      throw new DomainValidationError(
        'User password must have at least 6 characters',
      );
    }
  }

  public static normalizeEmail(email: string): string {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      throw new DomainValidationError('User email is required');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      throw new DomainValidationError('User email is invalid');
    }

    return normalizedEmail;
  }

  public get id(): string {
    return this.props.id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get email(): string {
    return this.props.email;
  }

  public get password(): string {
    return this.props.password;
  }

  public get isActive(): boolean {
    return this.props.isActive;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public activate(): void {
    if (this.props.isActive) {
      throw new DomainValidationError('User is already active');
    }

    this.props.isActive = true;
    this.touch();
  }

  public deactivate(): void {
    if (!this.props.isActive) {
      throw new DomainValidationError('User is already inactive');
    }

    this.props.isActive = false;
    this.touch();
  }

  public changeName(name: string): void {
    this.props.name = UserNames.create(name).value;
    this.touch();
  }

  public changeEmail(email: string): void {
    this.props.email = User.normalizeEmail(email);
    this.touch();
  }

  public changePassword(passwordHash: string): void {
    this.props.password = User.validateStoredPassword(passwordHash);
    this.touch();
  }

  public toPrimitives(): UserProps {
    return {
      ...this.props,
      createdAt: new Date(this.props.createdAt),
      updatedAt: new Date(this.props.updatedAt),
    };
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }

  private static validateStoredPassword(password: string): string {
    if (!password.trim()) {
      throw new DomainValidationError('User password is required');
    }

    return password;
  }
}

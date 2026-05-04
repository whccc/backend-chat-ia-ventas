import { CreateUserProps, UserProps } from '../interfaces/user.interface';
import { UserNames } from '../value-objects/user-names.value-object';

export class User {
  private constructor(private props: UserProps) {}

  public static create(props: CreateUserProps): User {
    const now = new Date();

    return new User({
      id: crypto.randomUUID(),
      name: UserNames.create(props.name).value,
      email: this.validateEmail(props.email),
      password: this.validatePassword(props.password),
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });
  }

  public static rehydrate(props: UserProps): User {
    return new User({
      ...props,
      name: UserNames.create(props.name).value,
      email: this.validateEmail(props.email),
      password: this.validatePassword(props.password),
    });
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
      throw new Error('User is already active');
    }

    this.props.isActive = true;
    this.touch();
  }

  public deactivate(): void {
    if (!this.props.isActive) {
      throw new Error('User is already inactive');
    }

    this.props.isActive = false;
    this.touch();
  }

  public changeName(name: string): void {
    this.props.name = UserNames.create(name).value;
    this.touch();
  }

  public changeEmail(email: string): void {
    this.props.email = User.validateEmail(email);
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

  private static validateEmail(email: string): string {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      throw new Error('User email is required');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      throw new Error('User email is invalid');
    }

    return normalizedEmail;
  }

  private static validatePassword(password: string): string {
    if (password.trim().length < 6) {
      throw new Error('User password must have at least 6 characters');
    }

    return password;
  }
}

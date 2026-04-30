import { UserProps } from '../interfaces/user.interface';

export class User {
  private readonly props: UserProps;

  private constructor(props: UserProps) {
    this.props = props;
  }

  public static create(props: UserProps): User {
    return new User(props);
  }
  public get id(): number {
    return this.props.id;
  }
  public get names(): string {
    return this.props.names;
  }
}

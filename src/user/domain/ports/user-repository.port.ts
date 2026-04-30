import { User } from '../entities/user.entity';
export const USER_REPOSITORY_PORT = 'USER_REPOSITORY_PORT';

export interface UserRepositoryPort {
  createUser(user: User): Promise<User>;
}

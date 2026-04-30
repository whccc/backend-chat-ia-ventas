import { User } from "src/user/domain/entities/user.entity";
import { UserCreateDto } from "../dtos/user.dto";

export const USER_USE_CASES_PORT = 'USER_USE_CASES_PORT';
export interface UserPort {
  createUser(user: UserCreateDto): Promise<User>;
}
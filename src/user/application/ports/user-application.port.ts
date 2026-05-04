import { CreateUserInputDto, UserOutputDto } from '../dtos/user.dto';

export const USER_USE_CASES_PORT = 'USER_USE_CASES_PORT';
export interface IUserApplicationPort {
  createUser(user: CreateUserInputDto): Promise<UserOutputDto>;
}

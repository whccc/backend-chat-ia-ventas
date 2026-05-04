import { Inject, Injectable } from '@nestjs/common';
import { CreateUserInputDto, UserOutputDto } from '../dtos/user.dto';
import { User } from 'src/user/domain/entities/user.entity';
import { IUserApplicationPort } from '../ports/user-application.port';
import { USER_REPOSITORY_PORT } from 'src/user/domain/ports/user-repository.port';
import type { UserRepositoryPort } from 'src/user/domain/ports/user-repository.port';

@Injectable()
export class UserService implements IUserApplicationPort {
  constructor(
    @Inject(USER_REPOSITORY_PORT)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async createUser(user: CreateUserInputDto): Promise<UserOutputDto> {
    const newUser = User.create(user);
    const savedUser = await this.userRepository.save(newUser);

    return this.toOutputDto(savedUser);
  }

  private toOutputDto(user: User): UserOutputDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

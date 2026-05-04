import { Inject, Injectable } from '@nestjs/common';
import { CreateUserInputDto, UserOutputDto } from '../dtos/user.dto';
import { User } from 'src/user/domain/entities/user.entity';
import { IUserApplicationPort } from '../ports/user-application.port';
import { USER_REPOSITORY_PORT } from 'src/user/domain/ports/user-repository.port';
import type { UserRepositoryPort } from 'src/user/domain/ports/user-repository.port';
import {
  PASSWORD_HASHER_PORT,
  type PasswordHasherPort,
} from '../ports/password-hasher.port';
import { UserEmailAlreadyExistsError } from 'src/user/domain/errors/user-email-already-exists.error';

@Injectable()
export class UserService implements IUserApplicationPort {
  constructor(
    @Inject(USER_REPOSITORY_PORT)
    private readonly userRepository: UserRepositoryPort,
    @Inject(PASSWORD_HASHER_PORT)
    private readonly passwordHasher: PasswordHasherPort,
  ) {}

  async createUser(user: CreateUserInputDto): Promise<UserOutputDto> {
    User.ensurePasswordPolicy(user.password);

    const normalizedEmail = User.normalizeEmail(user.email);
    const existingUser = await this.userRepository.findByEmail(normalizedEmail);

    if (existingUser) {
      throw new UserEmailAlreadyExistsError(normalizedEmail);
    }

    const hashedPassword = await this.passwordHasher.hash(user.password);
    const newUser = User.create({
      ...user,
      email: normalizedEmail,
      password: hashedPassword,
    });
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

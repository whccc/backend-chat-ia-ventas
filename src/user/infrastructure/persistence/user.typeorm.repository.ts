import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepositoryPort } from 'src/user/domain/ports/user-repository.port';
import { UserOrmEntity } from './entities/user.orm-entity';
import { User } from 'src/user/domain/entities/user.entity';
import { UserMapper } from './mappers/user.mapper';

@Injectable()
export class UserTypeOrmRepository implements UserRepositoryPort {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repository: Repository<UserOrmEntity>,
  ) {}

  async save(user: User): Promise<User> {
    const userOrmEntity = this.repository.create(UserMapper.toOrm(user));
    const savedUser = await this.repository.save(userOrmEntity);

    return UserMapper.toDomain(savedUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userOrmEntity = await this.repository.findOne({
      where: { email },
    });

    if (!userOrmEntity) {
      return null;
    }

    return UserMapper.toDomain(userOrmEntity);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepositoryPort } from 'src/user/domain/ports/user-repository.port';
import { UserOrmEntity } from './entities/user.orm-entity';
import { User } from 'src/user/domain/entities/user.entity';

@Injectable()
export class UserTypeOrmRepository implements UserRepositoryPort {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repository: Repository<UserOrmEntity>,
  ) {}
  async createUser(user: User): Promise<User> {
    const userOrmEntity = this.repository.create({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
    await this.repository.save(userOrmEntity);
    return user;
  }
}

import { Injectable } from '@nestjs/common';
import { UserCreateDto } from '../dtos/user.dto';
import { User } from 'src/user/domain/entities/user.entity';

@Injectable()
export class UserService {
  async createUser(user: UserCreateDto): Promise<User> {
    const newUser = User.create({
      id: Math.floor(Math.random() * 1000), 
      names: user.name,
    });
    return newUser;
  }
}

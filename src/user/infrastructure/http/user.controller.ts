import { Body, Controller, Inject, Post } from '@nestjs/common';
import { USER_USE_CASES_PORT } from 'src/user/application/ports/user-application.port';
import type { UserPort } from 'src/user/application/ports/user-application.port';
import { UserCreateDto, UserResponseDto } from './dtos/user-request.dto';

@Controller('user')
export class UserController {
  constructor(
    @Inject(USER_USE_CASES_PORT) private readonly userService: UserPort,
  ) {}
  @Post()
  async createUser(@Body() dto: UserCreateDto): Promise<UserResponseDto> {
    return this.userService.createUser(dto);
  }
}

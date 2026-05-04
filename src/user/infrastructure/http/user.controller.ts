import { Body, Controller, Inject, Post } from '@nestjs/common';
import { USER_USE_CASES_PORT } from 'src/user/application/ports/user-application.port';
import type { IUserApplicationPort } from 'src/user/application/ports/user-application.port';
import { CreateUserHttpRequestDto } from './dtos/user-request.dto';
import { CreateUserHttpResponseDto } from './dtos/user-response.dto';
import { UserHttpMapper } from './mappers/user-http.mapper';

@Controller('user')
export class UserController {
  constructor(
    @Inject(USER_USE_CASES_PORT)
    private readonly userService: IUserApplicationPort,
  ) {}

  @Post()
  async createUser(
    @Body() dto: CreateUserHttpRequestDto,
  ): Promise<CreateUserHttpResponseDto> {
    const user = await this.userService.createUser(
      UserHttpMapper.toApplicationInput(dto),
    );

    return UserHttpMapper.toHttpResponse(user);
  }
}

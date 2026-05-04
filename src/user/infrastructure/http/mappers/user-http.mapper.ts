import { CreateUserInputDto, UserOutputDto } from 'src/user/application/dtos/user.dto';
import { CreateUserHttpRequestDto } from '../dtos/user-request.dto';
import { CreateUserHttpResponseDto } from '../dtos/user-response.dto';

export class UserHttpMapper {
  static toApplicationInput(
    dto: CreateUserHttpRequestDto,
  ): CreateUserInputDto {
    return {
      name: dto.name,
      email: dto.email,
      password: dto.password,
    };
  }

  static toHttpResponse(dto: UserOutputDto): CreateUserHttpResponseDto {
    return {
      id: dto.id,
      name: dto.name,
      email: dto.email,
      isActive: dto.isActive,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    };
  }
}
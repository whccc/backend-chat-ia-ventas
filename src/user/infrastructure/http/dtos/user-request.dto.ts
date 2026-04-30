import { IsNotEmpty, IsString } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  id: string = '';

  @IsNotEmpty()
  @IsString()
  name: string = '';

  @IsNotEmpty()
  isActive: boolean = false;

  createdAt: Date = new Date();

  @IsNotEmpty()
  updatedAt: Date = new Date();
}

export class UserResponseDto {
  id: string = '';
  name: string = '';
}

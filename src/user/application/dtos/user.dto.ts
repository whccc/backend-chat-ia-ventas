export interface CreateUserInputDto {
  name: string;
  email: string;
  password: string;
}

export interface UserOutputDto {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export class CreateUserHttpResponseDto {
  id: string = '';
  name: string = '';
  email: string = '';
  isActive: boolean = false;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
}
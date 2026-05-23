import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class ProductCreateRequestDto {
  @IsNotEmpty()
  @IsString()
  code: string = '';

  @IsNotEmpty()
  @IsString()
  name: string = '';

  @IsNotEmpty()
  @IsString()
  description: string = '';

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  stock: number = 0;

  @IsNotEmpty()
  @IsNumber()
  price: number = 0;

  @IsString()
  additionalInfo: string = '';
}

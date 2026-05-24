import { IProductResponseDto } from '../dtos/responses/productResponse.dto';
import { IProductDto } from 'src/product/application/dtos/product.dto';

export class ProductHttpMapper {
  static toResponseProduct(dto: IProductDto): IProductResponseDto {
    return {
      id: dto.id!,
      code: dto.code,
      name: dto.name,
      description: dto.description,
      stock: dto.stock,
      price: dto.price,
    };
  }
  static toResponseProductWithIva(dto: IProductDto): IProductResponseDto {
    return {
      id: dto.id!,
      code: dto.code,
      name: dto.name,
      description: dto.description,
      stock: dto.stock,
      price: dto.price,
    };
  }
}

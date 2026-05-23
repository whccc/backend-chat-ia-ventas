import { IProduct } from 'src/product/domain/interfaces/product.interface';
import { IProductResponseDto } from '../dtos/responses/productResponse.dto';

export class ProductHttpMapper {
  static toHttpResponse(dto: IProduct): IProductResponseDto {
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

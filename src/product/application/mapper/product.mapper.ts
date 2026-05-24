import { Product } from 'src/product/domain/entities/product.entity';
import { IProductDto } from '../dtos/product.dto';

export class ProductMapper {
  static toProductDto(product: Product): IProductDto {
    const primitives = product.toPrimitives();
    return {
      id: primitives.id,
      code: primitives.code,
      name: primitives.name,
      description: primitives.description,
      stock: primitives.stock,
      price: primitives.price,
    };
  }
  /*  N mapper segun necesidades, por ejemplo, si queremos un DTO para listar productos, otro para detalles, etc. */
}

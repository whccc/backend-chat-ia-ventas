import { IProductCreateDto, IProductDto } from '../dtos/product.dto';

export const PRODUCT_APPLICATION_PORT = 'PRODUCT_APPLICATION_PORT';

export interface IProductServicePort {
  createProduct(product: IProductCreateDto): Promise<IProductDto>;
}

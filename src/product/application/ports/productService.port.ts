import { IProduct } from 'src/product/domain/interfaces/product.interface';
import { IProductCreateDto } from '../dtos/productCreate.dto';

export const PRODUCT_APPLICATION_PORT = 'PRODUCT_APPLICATION_PORT';

export interface IProductServicePort {
  createProduct(product: IProductCreateDto): Promise<IProduct>;
}

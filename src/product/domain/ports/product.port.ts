import { IProduct } from '../interfaces/product.interface';

export const PRODUCT_DOMAIN_PORT = 'PRODUCT_DOMAIN_PORT';
export interface IProductDomainPort {
  createProduct(product: IProduct): Promise<IProduct>;
}

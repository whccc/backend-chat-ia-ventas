import { Product } from '../entities/product.entity';

export const PRODUCT_DOMAIN_PORT = 'PRODUCT_DOMAIN_PORT';
export interface IProductDomainPort {
  createProduct(product: Product): Promise<Product>;
  getProductByCode(code: string): Promise<Product | null>;
  getProductByName(name: string): Promise<Product | null>;
}

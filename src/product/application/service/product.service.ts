import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_DOMAIN_PORT } from 'src/product/domain/ports/product.port';
import type { IProductDomainPort } from 'src/product/domain/ports/product.port';
import { IProductCreateDto } from '../dtos/productCreate.dto';
import { IProductServicePort } from '../ports/productService.port';
import { Product } from 'src/product/domain/entities/product.entity';
@Injectable()
export class ProductService implements IProductServicePort {
  constructor(
    @Inject(PRODUCT_DOMAIN_PORT)
    private readonly productDomainPort: IProductDomainPort,
  ) {}

  public createProduct(product: IProductCreateDto) {
    const productCreated = Product.create(product);

    return this.productDomainPort.createProduct(productCreated);
  }
}

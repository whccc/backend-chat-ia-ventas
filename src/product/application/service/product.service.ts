import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_DOMAIN_PORT } from 'src/product/domain/ports/product.port';
import type { IProductDomainPort } from 'src/product/domain/ports/product.port';
import { IProductCreateDto, IProductDto } from '../dtos/product.dto';
import { IProductServicePort } from '../ports/productService.port';
import { Product } from 'src/product/domain/entities/product.entity';
import { ProductMapper } from '../mapper/product.mapper';
import { DomainError } from 'src/shared/domain/errors/domain.error';
import { DomainValidationError } from 'src/shared/domain/errors/domain-validation.error';
@Injectable()
export class ProductService implements IProductServicePort {
  constructor(
    @Inject(PRODUCT_DOMAIN_PORT)
    private readonly productDomainPort: IProductDomainPort,
  ) {}

  public async createProduct(product: IProductCreateDto): Promise<IProductDto> {
    const productCreated = Product.create(product);
    productCreated.validateProductToCreate();

    const exitsCode = await this.productDomainPort.getProductByCode(
      product.code,
    );
    if (exitsCode) {
      throw new DomainValidationError('El código del producto ya existe');
    }
    const exitsName = await this.productDomainPort.getProductByName(
      product.name,
    );
    if (exitsName) {
      throw new DomainValidationError('El nombre del producto ya existe');
    }
    const productCreate =
      await this.productDomainPort.createProduct(productCreated);
    return ProductMapper.toProductDto(productCreate);
  }
}

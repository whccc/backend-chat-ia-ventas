import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IProductDomainPort } from 'src/product/domain/ports/product.port';
import { ProductOrmEntity } from '../entity/productOrm.persistence';
import { Repository } from 'typeorm';
import { IProduct } from 'src/product/domain/interfaces/product.interface';

@Injectable()
export class ProductTypeOrmRepository implements IProductDomainPort {
  constructor(
    @InjectRepository(ProductOrmEntity)
    private readonly repository: Repository<ProductOrmEntity>,
  ) {}

  async createProduct(product: IProduct): Promise<IProduct> {
    const productOrmEntity = this.repository.create(product);
    const savedProduct = await this.repository.save(productOrmEntity);
    return savedProduct;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IProductDomainPort } from 'src/product/domain/ports/product.port';
import { Repository } from 'typeorm';
import { Product } from 'src/product/domain/entities/product.entity';
import { ProductTypeOrmEntity } from '../entity/productTypeOrm.persistence';
import { ProductTypeOrmPersistenceMapper } from '../mapper/productTypeOrm.persistence.mapper';

@Injectable()
export class ProductTypeOrmRepository implements IProductDomainPort {
  constructor(
    @InjectRepository(ProductTypeOrmEntity)
    private readonly repository: Repository<ProductTypeOrmEntity>,
  ) {}

  async createProduct(product: Product): Promise<Product> {
    const productOrmEntity = this.repository.create(
      ProductTypeOrmPersistenceMapper.toOrmEntity(product),
    );
    const savedProduct = await this.repository.save(productOrmEntity);
    return ProductTypeOrmPersistenceMapper.toDomain(savedProduct);
  }
  async getProductByCode(code: string): Promise<Product | null> {
    const product = await this.repository.findOne({ where: { code } });
    return product ? ProductTypeOrmPersistenceMapper.toDomain(product) : null;
  }
  async getProductByName(name: string): Promise<Product | null> {
    const product = await this.repository.findOne({ where: { name } });
    return product ? ProductTypeOrmPersistenceMapper.toDomain(product) : null;
  }
}

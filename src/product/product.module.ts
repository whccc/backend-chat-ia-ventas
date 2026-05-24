import { Module } from '@nestjs/common';
import { ProductController } from './infrastructure/http/product.controller';
import { PRODUCT_APPLICATION_PORT } from './application/ports/productService.port';
import { ProductService } from './application/service/product.service';
import { PRODUCT_DOMAIN_PORT } from './domain/ports/product.port';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTypeOrmEntity } from './infrastructure/typeOrm/entity/productTypeOrm.persistence';
import { ProductTypeOrmRepository } from './infrastructure/typeOrm/repository/productTypeOrm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductTypeOrmEntity])],
  controllers: [ProductController],
  providers: [
    {
      provide: PRODUCT_DOMAIN_PORT,
      useClass: ProductTypeOrmRepository,
    },
    {
      provide: PRODUCT_APPLICATION_PORT,
      useClass: ProductService,
    },
  ],
  exports: [],
})
export class ProductModule {}

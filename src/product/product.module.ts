import { Module } from '@nestjs/common';
import { ProductController } from './infrastructure/http/product.controller';
import { PRODUCT_APPLICATION_PORT } from './application/ports/productService.port';
import { ProductService } from './application/service/product.service';
import { ProductTypeOrmRepository } from './infrastructure/persistence/repository/productTypeOrm.repository';
import { PRODUCT_DOMAIN_PORT } from './domain/ports/product.port';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductOrmEntity } from './infrastructure/persistence/entity/productOrm.persistence';

@Module({
imports: [TypeOrmModule.forFeature([ProductOrmEntity])],
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

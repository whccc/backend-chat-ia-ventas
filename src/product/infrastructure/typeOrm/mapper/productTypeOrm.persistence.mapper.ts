import { Product } from 'src/product/domain/entities/product.entity';
import { ProductTypeOrmEntity } from '../entity/productTypeOrm.persistence';

export class ProductTypeOrmPersistenceMapper {
  static toDomain(productOrmEntity: ProductTypeOrmEntity): Product {
    return Product.rehydrate({
      id: productOrmEntity.id,
      code: productOrmEntity.code,
      name: productOrmEntity.name,
      description: productOrmEntity.description,
      stock: productOrmEntity.stock,
      price: productOrmEntity.price,
    });
  }
  static toOrmEntity(product: Product): ProductTypeOrmEntity {
    const primitives = product.toPrimitives();
    const ormEntity = new ProductTypeOrmEntity();
    ormEntity.id = primitives.id;
    ormEntity.code = primitives.code;
    ormEntity.name = primitives.name;
    ormEntity.description = primitives.description;
    ormEntity.stock = primitives.stock;
    ormEntity.price = primitives.price;
    return ormEntity;
  }
}

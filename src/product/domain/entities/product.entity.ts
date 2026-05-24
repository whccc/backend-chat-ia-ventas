import { ICreateProduct, IProduct } from '../interfaces/product.interface';
import { DomainConflictError } from 'src/shared/domain/errors/domain-conflict.error';

export class Product {
  private constructor(private props: IProduct) {}
  public static create(props: ICreateProduct): Product {
    return new Product(props as IProduct);
  }
  public static rehydrate(props: IProduct): Product {
    return new Product(props);
  }
  public toPrimitives(): IProduct {
    return { ...this.props };
  }

  public validateProductToCreate() {
    const { stock } = this.props;
    if (stock === undefined || stock <= 0) {
      throw new DomainConflictError(
        'Stock is required and must be a positive number',
      );
    }
  }
}

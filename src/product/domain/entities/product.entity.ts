import { ICreateProduct, IProduct } from '../interfaces/product.interface';

export class Product {
  private constructor(private props: IProduct) {}
  public static create(props: ICreateProduct): IProduct {
    return new Product(props as IProduct).props;
  }
  public static rehydrate(props: IProduct): IProduct {
    return new Product(props).props;
  }
}

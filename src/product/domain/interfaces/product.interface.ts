export interface IProduct {
  id?: number;
  code: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface ICreateProduct extends Omit<IProduct, 'id'> {}

export interface IUpdateProduct extends Partial<ICreateProduct> {
  id: number;
}

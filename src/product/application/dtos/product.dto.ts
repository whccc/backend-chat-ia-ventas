export interface IProductCreateDto {
  code: string;
  name: string;
  description: string;
  stock: number;
  price: number;
}

export interface IProductDto {
  id: number;
  code: string;
  name: string;
  description: string;
  stock: number;
  price: number;
}

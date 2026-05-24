import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  PRODUCT_APPLICATION_PORT,
  type IProductServicePort,
} from 'src/product/application/ports/productService.port';
import { IProductResponseDto } from './dtos/responses/productResponse.dto';
import { ProductCreateRequestDto } from './dtos/requests/productCreateRequest.dto';
import { ProductHttpMapper } from './mappers/productHttp.mapper';

@Controller('product')
export class ProductController {
  constructor(
    @Inject(PRODUCT_APPLICATION_PORT)
    private readonly productService: IProductServicePort,
  ) {}

  @Post()
  async createProduct(
    @Body() dto: ProductCreateRequestDto,
  ): Promise<IProductResponseDto> {
    const product = await this.productService.createProduct(dto);
    return ProductHttpMapper.toResponseProduct(product);
  }
}

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import Product from './product.entity';
import { ProductService } from './product.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) { }

  @Mutation(() => Product)
  createProduct(@Args('createProductInput') createProductInput: CreateProductInput): Promise<Product> {
    return this.productService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'Product' })
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Query(() => Product, { name: 'Product' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Mutation(() => Product)
  updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput): Promise<Product> {
    return this.productService.update(updateProductInput.id, updateProductInput);
  }

  @Mutation(() => Product)
  removeProduct(@Args('id', { type: () => Int }) id: number): Promise<{ deletedRecordCount: number }> {
    return this.productService.remove(id);
  }
}

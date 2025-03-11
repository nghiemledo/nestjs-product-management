import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Product from './product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Category } from '../category/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private repository: Repository<Product>,
    private cateRepository: Repository<Category>,
  ) { }

  async create(createProductInput: CreateProductInput): Promise<Product> {
    const { categoryId } = createProductInput;
    const category = await this.cateRepository.findOneBy({ id: categoryId });
    if (!category) throw new NotFoundException(category);
    const dataToBeCreated = this.repository.create({
      ...createProductInput,
      category
    });
    return this.repository.save(dataToBeCreated);
  }

  async findAll(): Promise<Product[]> {
    const products = await this.repository.find();
    return products;
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.repository.findOneBy({
      id: id
    })
    return product;
  }

  async update(id: number, updateProductInput: UpdateProductInput): Promise<Product> {
    const { categoryId } = updateProductInput;
    const category = await this.cateRepository.findOneBy({ id: categoryId });
    if (!category) throw new NotFoundException(category);
    await this.repository.findOneBy({ id: id });
    const dataToBeUpdated = await this.repository.preload({
      id,
      ...updateProductInput,
      category
    });
    return this.repository.save(dataToBeUpdated);
  }

  async remove(id: number): Promise<{ deletedRecordCount: number }> {
    await this.repository.findOneBy({ id: id });
    const deletedData = await this.repository.delete({ id });
    return { deletedRecordCount: deletedData.affected };
  }
}

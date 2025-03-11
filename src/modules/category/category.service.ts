import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private repository: Repository<Category>,
  ) { }

  create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    const dataToBeCreated = this.repository.create(createCategoryInput);
    return this.repository.save(dataToBeCreated);
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.repository.findOneBy({
      id: id
    })
    return category;
  }

  async update(id: number, updateCategoryInput: UpdateCategoryInput): Promise<Category> {
    await this.repository.findOneBy({ id: id });
    const dataToBeUpdated = await this.repository.preload({
      id,
      ...updateCategoryInput,
    });
    return this.repository.save(dataToBeUpdated);
  }

  async remove(id: number): Promise<{ deletedRecordCount: number }> {
    await this.repository.findOneBy({ id: id });
    const deletedData = await this.repository.delete({ id });
    return { deletedRecordCount: deletedData.affected };
  }
}

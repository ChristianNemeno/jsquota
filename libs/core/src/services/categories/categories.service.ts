import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../entities/categories/category.entity';
import { Quote } from '../../entities/quotes/quote.entity';
import { CreateCategoryDto } from '../../dtos/categories/create-category.dto';
import { UpdateCategoryDto } from '../../dtos/categories/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(dto);
    return this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    return this.categoryRepository.findOneByOrFail({ id });
  }

  async update(id: number, dto: UpdateCategoryDto): Promise<Category> {
    await this.categoryRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }

  async findQuotesByCategory(id: number): Promise<Quote[]> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: { quotes: true },
    });
    if (!category) {
      throw new Error(`Category with ID ${id} not found`);
    }
    return category.quotes;
  }
}

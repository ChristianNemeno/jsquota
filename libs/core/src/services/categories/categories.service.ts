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

  /**
   * Creates a new category
   * @param dto CreateCategoryDto containing name and optional description
   * @returns Promise resolving to the created category
   */
  async create(dto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(dto);
    return this.categoryRepository.save(category);
  }

  /**
   * Retrieves all categories
   * @returns Promise resolving to an array of all categories
   */
  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  /**
   * Finds a category by its ID
   * @param id The ID of the category to find
   * @returns Promise resolving to the found category or throwing if not found
   */
  async findOne(id: number): Promise<Category> {
    return this.categoryRepository.findOneByOrFail({ id });
  }

  /**
   * Updates an existing category
   * @param id The ID of the category to update
   * @param dto UpdateCategoryDto containing the fields to update
   * @returns Promise resolving to the updated category
   */
  async update(id: number, dto: UpdateCategoryDto): Promise<Category> {
    await this.categoryRepository.update(id, dto);
    return this.findOne(id);
  }

  /**
   * Deletes a category by its ID
   * @param id The ID of the category to delete
   */
  async remove(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }

  /**
   * Retrieves all quotes associated with a specific category
   * @param id The ID of the category
   * @returns Promise resolving to an array of quotes
   */
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

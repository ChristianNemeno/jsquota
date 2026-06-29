import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '@app/core/dtos';
import { Category, Quote } from '@app/core/entities';
import { CategoriesService } from '@app/core/services';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly _categoriesService: CategoriesService) {}

  @Post()
  /**
   * Creates a new category
   * @param dto CreateCategoryDto containing the category name and optional description
   * @returns Promise resolving to the created category
   */
  public async create(@Body() dto: CreateCategoryDto): Promise<Category> {
    return this._categoriesService.create(dto);
  }

  @Get()
  /**
   * Retrieves all categories
   * @returns Promise resolving to an array of all categories
   */
  public async findAll(): Promise<Category[]> {
    return this._categoriesService.findAll();
  }

  @Get(':id/quotes')
  /**
   * Retrieves all quotes under a specific category
   * @param id The ID of the category
   * @returns Promise resolving to an array of quotes
   */
  public async findQuotes(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Quote[]> {
    return this._categoriesService.findQuotesByCategory(id);
  }

  @Get(':id')
  /**
   * Retrieves a single category by ID
   * @param id The ID of the category
   * @returns Promise resolving to the found category
   */
  public async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Category> {
    return this._categoriesService.findOne(id);
  }

  @Put(':id')
  /**
   * Updates an existing category
   * @param id The ID of the category to update
   * @param dto UpdateCategoryDto containing the fields to update
   * @returns Promise resolving to the updated category
   */
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
  ): Promise<Category> {
    return this._categoriesService.update(id, dto);
  }

  @Delete(':id')
  /**
   * Deletes a category by ID
   * @param id The ID of the category to delete
   */
  public async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this._categoriesService.remove(id);
  }
}

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
  public async create(@Body() dto: CreateCategoryDto): Promise<Category> {
    return this._categoriesService.create(dto);
  }

  @Get()
  public async findAll(): Promise<Category[]> {
    return this._categoriesService.findAll();
  }

  @Get(':id/quotes')
  public async findQuotes(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Quote[]> {
    return this._categoriesService.findQuotesByCategory(id);
  }

  @Get(':id')
  public async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Category> {
    return this._categoriesService.findOne(id);
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
  ): Promise<Category> {
    return this._categoriesService.update(id, dto);
  }

  @Delete(':id')
  public async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this._categoriesService.remove(id);
  }
}

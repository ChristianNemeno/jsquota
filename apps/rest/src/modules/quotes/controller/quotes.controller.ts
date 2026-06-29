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
import { CreateQuoteDto, UpdateQuoteDto } from '@app/core/dtos';
import { Quote } from '@app/core/entities';
import { QuotesService } from '@app/core/services';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly _quotesService: QuotesService) {}

  @Post()
  /**
   * Creates a new quote
   * @param dto CreateQuoteDto containing text, authorId, categoryId, and optional tagIds
   * @returns Promise resolving to the created quote
   */
  public async create(@Body() dto: CreateQuoteDto): Promise<Quote> {
    return this._quotesService.create(dto);
  }

  @Get()
  /**
   * Retrieves all quotes
   * @returns Promise resolving to an array of all quotes
   */
  public async findAll(): Promise<Quote[]> {
    return this._quotesService.findAll();
  }

  @Get(':id')
  /**
   * Retrieves a single quote by ID
   * @param id The ID of the quote
   * @returns Promise resolving to the found quote
   */
  public async findOne(@Param('id', ParseIntPipe) id: number): Promise<Quote> {
    return this._quotesService.findOne(id);
  }

  @Put(':id')
  /**
   * Updates an existing quote
   * @param id The ID of the quote to update
   * @param dto UpdateQuoteDto containing the fields to update
   * @returns Promise resolving to the updated quote
   */
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateQuoteDto,
  ): Promise<Quote> {
    return this._quotesService.update(id, dto);
  }

  @Delete(':id')
  /**
   * Deletes a quote by ID
   * @param id The ID of the quote to delete
   */
  public async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this._quotesService.remove(id);
  }
}

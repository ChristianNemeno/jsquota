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
import { CreateAuthorDto, UpdateAuthorDto } from '@app/core/dtos';
import { Author, Quote } from '@app/core/entities';
import { AuthorsService } from '@app/core/services';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly _authorsService: AuthorsService) {}

  @Post()
  /**
   * Creates a new author
   * @param dto CreateAuthorDto containing the author's name, email, and optional bio
   * @returns Promise resolving to the created author
   */
  public async create(@Body() dto: CreateAuthorDto): Promise<Author> {
    return this._authorsService.createAuthor(dto);
  }

  @Get()
  /**
   * Retrieves all authors
   * @returns Promise resolving to an array of all authors
   */
  public async findAll(): Promise<Author[]> {
    return this._authorsService.findAllAuthors();
  }

  @Get(':id/quotes')
  /**
   * Retrieves all quotes written by a specific author
   * @param id The ID of the author
   * @returns Promise resolving to an array of quotes
   */
  public async findQuotes(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Quote[]> {
    return this._authorsService.findQuotesByAuthor(id);
  }

  @Get(':id')
  /**
   * Retrieves a single author by ID
   * @param id The ID of the author
   * @returns Promise resolving to the found author
   */
  public async findOne(@Param('id', ParseIntPipe) id: number): Promise<Author> {
    return this._authorsService.findOne(id);
  }

  @Put(':id')
  /**
   * Updates an existing author
   * @param id The ID of the author to update
   * @param dto UpdateAuthorDto containing the fields to update
   * @returns Promise resolving to the updated author
   */
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAuthorDto,
  ): Promise<Author> {
    return this._authorsService.update(id, dto);
  }

  @Delete(':id')
  /**
   * Deletes an author by ID
   * @param id The ID of the author to delete
   */
  public async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this._authorsService.remove(id);
  }
}

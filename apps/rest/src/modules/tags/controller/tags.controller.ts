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
import { CreateTagDto, UpdateTagDto } from '@app/core/dtos';
import { Tag, Quote } from '@app/core/entities';
import { TagsService } from '@app/core/services';

@Controller('tags')
export class TagsController {
  constructor(private readonly _tagsService: TagsService) {}

  @Post()
  /**
   * Creates a new tag
   * @param dto CreateTagDto containing the tag name
   * @returns Promise resolving to the created tag
   */
  public async create(@Body() dto: CreateTagDto): Promise<Tag> {
    return this._tagsService.create(dto);
  }

  @Get()
  /**
   * Retrieves all tags
   * @returns Promise resolving to an array of all tags
   */
  public async findAll(): Promise<Tag[]> {
    return this._tagsService.findAll();
  }

  @Get(':id/quotes')
  /**
   * Retrieves all quotes associated with a specific tag
   * @param id The ID of the tag
   * @returns Promise resolving to an array of quotes
   */
  public async findQuotes(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Quote[]> {
    return this._tagsService.findQuotesByTag(id);
  }

  @Get(':id')
  /**
   * Retrieves a single tag by ID
   * @param id The ID of the tag
   * @returns Promise resolving to the found tag
   */
  public async findOne(@Param('id', ParseIntPipe) id: number): Promise<Tag> {
    return this._tagsService.findOne(id);
  }

  @Put(':id')
  /**
   * Updates an existing tag
   * @param id The ID of the tag to update
   * @param dto UpdateTagDto containing the fields to update
   * @returns Promise resolving to the updated tag
   */
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTagDto,
  ): Promise<Tag> {
    return this._tagsService.update(id, dto);
  }

  @Delete(':id')
  /**
   * Deletes a tag by ID
   * @param id The ID of the tag to delete
   */
  public async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this._tagsService.remove(id);
  }
}

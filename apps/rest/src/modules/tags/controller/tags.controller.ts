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
  public async create(@Body() dto: CreateTagDto): Promise<Tag> {
    return this._tagsService.create(dto);
  }

  @Get()
  public async findAll(): Promise<Tag[]> {
    return this._tagsService.findAll();
  }

  @Get(':id/quotes')
  public async findQuotes(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Quote[]> {
    return this._tagsService.findQuotesByTag(id);
  }

  @Get(':id')
  public async findOne(@Param('id', ParseIntPipe) id: number): Promise<Tag> {
    return this._tagsService.findOne(id);
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTagDto,
  ): Promise<Tag> {
    return this._tagsService.update(id, dto);
  }

  @Delete(':id')
  public async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this._tagsService.remove(id);
  }
}

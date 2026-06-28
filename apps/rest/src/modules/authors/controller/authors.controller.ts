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
import { Author } from '@app/core/entities';
import { AuthorsService } from '@app/core/services';

@Controller('authors')
export class AuthorsController {
    constructor(private readonly _authorsService: AuthorsService) {}

    @Post()
    public async create(@Body() dto: CreateAuthorDto): Promise<Author> {
        return this._authorsService.createAuthor(dto);
    }

    @Get()
    public async findAll(): Promise<Author[]> {
        return this._authorsService.findAllAuthors();
    }

    @Get(':id')
    public async findOne(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<Author> {
        return this._authorsService.findOne(id);
    }

    @Get(':id/quotes')
    public async findQuotes(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<Author> {
        return this._authorsService.findOne(id);
    }

    @Put(':id')
    public async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateAuthorDto,
    ): Promise<Author> {
        return this._authorsService.update(id, dto);
    }

    @Delete(':id')
    public async remove(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<void> {
        await this._authorsService.remove(id);
    }
}
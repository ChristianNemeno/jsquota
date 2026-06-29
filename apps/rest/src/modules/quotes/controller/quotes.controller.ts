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
  public async create(@Body() dto: CreateQuoteDto): Promise<Quote> {
    return this._quotesService.create(dto);
  }

  @Get()
  public async findAll(): Promise<Quote[]> {
    return this._quotesService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id', ParseIntPipe) id: number): Promise<Quote> {
    return this._quotesService.findOne(id);
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateQuoteDto,
  ): Promise<Quote> {
    return this._quotesService.update(id, dto);
  }

  @Delete(':id')
  public async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this._quotesService.remove(id);
  }
}

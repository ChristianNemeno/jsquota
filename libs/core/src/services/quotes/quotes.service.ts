import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from '../../entities/quotes/quote.entity';
import { Tag } from '../../entities/tags/tag.entity';
import { CreateQuoteDto } from '../../dtos/quotes/create-quote.dto';
import { UpdateQuoteDto } from '../../dtos/quotes/update-quote.dto';
import { Repository, In } from 'typeorm';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private readonly quoteRepository: Repository<Quote>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(dto: CreateQuoteDto): Promise<Quote> {
    const quote = this.quoteRepository.create({
      text: dto.text,
      authorId: dto.authorId,
      categoryId: dto.categoryId,
    });

    if (dto.tagIds?.length) {
      quote.tags = await this.tagRepository.findBy({ id: In(dto.tagIds) });
    }

    return await this.quoteRepository.save(quote);
  }

  async findAll(): Promise<Quote[]> {
    return await this.quoteRepository.find({
      relations: { author: true, category: true, tags: true },
    });
  }

  async findOne(id: number): Promise<Quote> {
    return await this.quoteRepository.findOneOrFail({
      where: { id },
      relations: { author: true, category: true, tags: true },
    });
  }

  async update(id: number, dto: UpdateQuoteDto): Promise<Quote> {
    const quote = await this.findOne(id);

    if (dto.text !== undefined) quote.text = dto.text;
    if (dto.authorId !== undefined) quote.authorId = dto.authorId;
    if (dto.categoryId !== undefined) quote.categoryId = dto.categoryId;

    if (dto.tagIds !== undefined) {
      quote.tags = dto.tagIds.length
        ? await this.tagRepository.findBy({ id: In(dto.tagIds) })
        : [];
    }

    return await this.quoteRepository.save(quote);
  }

  async remove(id: number): Promise<void> {
    await this.quoteRepository.delete(id);
  }
}

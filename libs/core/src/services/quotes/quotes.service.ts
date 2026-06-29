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

  /**
   * Creates a new quote with optional tags
   * @param dto CreateQuoteDto containing text, authorId, categoryId, and optional tagIds
   * @returns Promise resolving to the created quote
   */
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

  /**
   * Retrieves all quotes with author, category, and tags relations
   * @returns Promise resolving to an array of all quotes
   */
  async findAll(): Promise<Quote[]> {
    return await this.quoteRepository.find({
      relations: { author: true, category: true, tags: true },
    });
  }

  /**
   * Finds a quote by its ID with author, category, and tags relations
   * @param id The ID of the quote to find
   * @returns Promise resolving to the found quote or throwing if not found
   */
  async findOne(id: number): Promise<Quote> {
    return await this.quoteRepository.findOneOrFail({
      where: { id },
      relations: { author: true, category: true, tags: true },
    });
  }

  /**
   * Updates an existing quote and optionally reassigns its tags
   * @param id The ID of the quote to update
   * @param dto UpdateQuoteDto containing the fields to update
   * @returns Promise resolving to the updated quote
   */
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

  /**
   * Deletes a quote by its ID
   * @param id The ID of the quote to delete
   */
  async remove(id: number): Promise<void> {
    await this.quoteRepository.delete(id);
  }
}

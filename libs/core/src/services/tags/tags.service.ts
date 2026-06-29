import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../../entities/tags/tag.entity';
import { Quote } from '../../entities/quotes/quote.entity';
import { CreateTagDto } from '../../dtos/tags/create-tag.dto';
import { UpdateTagDto } from '../../dtos/tags/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(dto: CreateTagDto): Promise<Tag> {
    const tag = this.tagRepository.create(dto);
    return this.tagRepository.save(tag);
  }

  async findAll(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  async findOne(id: number): Promise<Tag> {
    return this.tagRepository.findOneByOrFail({ id });
  }

  async update(id: number, dto: UpdateTagDto): Promise<Tag> {
    await this.tagRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.tagRepository.delete(id);
  }

  async findQuotesByTag(id: number): Promise<Quote[]> {
    const tag = await this.tagRepository.findOne({
      where: { id },
      relations: { quotes: true },
    });
    if (!tag) {
      throw new Error(`Tag with ID ${id} not found`);
    }
    return tag.quotes;
  }
}

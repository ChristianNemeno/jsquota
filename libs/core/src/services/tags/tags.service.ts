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

  /**
   * Creates a new tag
   * @param dto CreateTagDto containing the tag name
   * @returns Promise resolving to the created tag
   */
  async create(dto: CreateTagDto): Promise<Tag> {
    const tag = this.tagRepository.create(dto);
    return this.tagRepository.save(tag);
  }

  /**
   * Retrieves all tags
   * @returns Promise resolving to an array of all tags
   */
  async findAll(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  /**
   * Finds a tag by its ID
   * @param id The ID of the tag to find
   * @returns Promise resolving to the found tag or throwing if not found
   */
  async findOne(id: number): Promise<Tag> {
    return this.tagRepository.findOneByOrFail({ id });
  }

  /**
   * Updates an existing tag
   * @param id The ID of the tag to update
   * @param dto UpdateTagDto containing the fields to update
   * @returns Promise resolving to the updated tag
   */
  async update(id: number, dto: UpdateTagDto): Promise<Tag> {
    await this.tagRepository.update(id, dto);
    return this.findOne(id);
  }

  /**
   * Deletes a tag by its ID
   * @param id The ID of the tag to delete
   */
  async remove(id: number): Promise<void> {
    await this.tagRepository.delete(id);
  }

  /**
   * Retrieves all quotes associated with a specific tag
   * @param id The ID of the tag
   * @returns Promise resolving to an array of quotes
   */
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

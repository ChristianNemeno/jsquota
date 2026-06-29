import { Injectable } from '@nestjs/common';
import { Author } from '../../entities/authors/author.entity';
import { Quote } from '../../entities/quotes/quote.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAuthorDto } from '../../dtos/authors/create-author.dto';
import { UpdateAuthorDto } from '../../dtos/authors/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  /**
   * Creates a new author
   * @param dto CreateAuthorDto object containing the author's information
   * @returns Promise resolving to the created author
   */
  async createAuthor(dto: CreateAuthorDto): Promise<Author> {
    const author = this.authorRepository.create(dto);
    return await this.authorRepository.save(author);
  }

  /**
   * Retrieves all authors from the database
   * @returns Promise resolving to an array of all authors
   */
  async findAllAuthors(): Promise<Author[]> {
    return await this.authorRepository.find();
  }

  /**
   * Finds an author by their ID
   * @param id The ID of the author to find
   * @returns Promise resolving to the found author or throwing an error if not found
   */
  async findOne(id: number): Promise<Author> {
    return this.authorRepository.findOneByOrFail({ id });
  }
  /**
   * Updates an existing author
   * @param id The ID of the author to update
   * @param dto UpdateAuthorDto object containing the updated author's information
   * @returns Promise resolving to the updated author
   */
  async update(id: number, dto: UpdateAuthorDto): Promise<Author> {
    await this.authorRepository.update(id, dto);
    return this.findOne(id);
  }

  /**
   * Deletes an author by their ID
   * @param id The ID of the author to delete
   */
  async remove(id: number): Promise<void> {
    await this.authorRepository.delete(id);
  }

  /**
   * Returns all quotes associated with a specific author by their ID
   * @param id accepts an number of type id author
   * @returns Promise , Array of Quote
   */
  async findQuotesByAuthor(id: number): Promise<Quote[]> {
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: { quotes: true },
    });
    if (!author) {
      throw new Error(`Author with ID ${id} not found`);
    }
    return author.quotes;
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuotesService } from './quotes.service';
import { Quote } from '../../entities/quotes/quote.entity';
import { Tag } from '../../entities/tags/tag.entity';
import { before } from 'node:test';

describe('QuotesService', () =>{
    let service: QuotesService;

    let mockQuoteRespository: Partial<Record<keyof Repository<Quote>, jest.Mock>>;
    let mockTagRepository: Partial<Record<keyof Repository<Tag>, jest.Mock>>;

    beforeEach(async () => {

        mockQuoteRespository = {
        create: jest.fn(),
        save: jest.fn(),
        find: jest.fn(),
        findOneOrFail: jest.fn(),
        delete: jest.fn(),
        };

        mockTagRepository = {
            findBy: jest.fn(),
        };

        // like a sandboxed testing module
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QuotesService,
                {
                    provide: getRepositoryToken(Quote),
                    useValue: mockQuoteRespository,
                },
                {
                    provide: getRepositoryToken(Tag),
                    useValue: mockTagRepository,
                },
            ],
        }).compile();

        // retrieve the instantiated service from the testing module.
        service = module.get<QuotesService>(QuotesService)
    });

    // "it" is a single test case

})
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Quote, Tag } from '@app/core/entities';
import { QuotesService } from '@app/core/services';
import { QuotesController } from './controller/quotes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Quote, Tag, Category])],
  controllers: [QuotesController],
  providers: [QuotesService],
})
export class QuotesModule {}
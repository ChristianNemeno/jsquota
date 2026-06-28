import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '@app/core/entities';
import { AuthorsService } from '@app/core/services';
import { AuthorsController } from './controller/authors.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}
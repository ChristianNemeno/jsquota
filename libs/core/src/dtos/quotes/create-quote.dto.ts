import { IsInt, IsOptional, IsString, IsArray } from 'class-validator';

export class CreateQuoteDto {
  @IsString()
  text!: string;

  @IsInt()
  authorId!: number;

  @IsInt()
  categoryId!: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tagIds?: number[];
}

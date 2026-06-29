import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class QuoteResponse {
  @ApiProperty()
  public id!: number;

  @ApiProperty()
  public text!: string;

  @ApiProperty()
  public authorId!: number;

  @ApiProperty()
  public categoryId!: number;

  @ApiProperty()
  public createdAt!: Date;

  @ApiProperty()
  public updatedAt!: Date;
}

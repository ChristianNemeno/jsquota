import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CategoryResponse {
  @ApiProperty()
  public id!: number;

  @ApiProperty()
  public name!: string;

  @ApiPropertyOptional()
  public description?: string;

  @ApiProperty()
  public createdAt!: Date;

  @ApiProperty()
  public updatedAt!: Date;
}

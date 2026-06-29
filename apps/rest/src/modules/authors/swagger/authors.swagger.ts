import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AuthorResponse {
  @ApiProperty()
  public id!: number;

  @ApiProperty()
  public name!: string;

  @ApiProperty()
  public email!: string;

  @ApiPropertyOptional()
  public bio?: string;

  @ApiProperty()
  public createdAt!: Date;

  @ApiProperty()
  public updatedAt!: Date;
}

import { ApiProperty } from '@nestjs/swagger';

export class TagResponse {
  @ApiProperty()
  public id!: number;

  @ApiProperty()
  public name!: string;

  @ApiProperty()
  public createdAt!: Date;

  @ApiProperty()
  public updatedAt!: Date;
}

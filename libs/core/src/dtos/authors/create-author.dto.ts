import { IsAlpha, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  name!: string;
  @IsEmail()
  email!: string;
  @IsOptional()
  bio!: string;
}

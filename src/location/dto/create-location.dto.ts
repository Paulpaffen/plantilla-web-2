import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsNumber()
  @Min(0)
  cost: number;

  @IsOptional()
  @IsNumber()
  ownerId?: number;
}

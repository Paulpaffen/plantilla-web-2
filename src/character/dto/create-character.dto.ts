import { IsString, IsNumber, IsBoolean, IsOptional, Min } from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  salary: number;

  @IsBoolean()
  employee: boolean;

  @IsOptional()
  @IsNumber()
  propertyId?: number;
}

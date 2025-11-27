import { IsString, IsNumber, IsBoolean, IsOptional, Min } from 'class-validator';

export class UpdateCharacterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  salary?: number;

  @IsOptional()
  @IsBoolean()
  employee?: boolean;

  @IsOptional()
  @IsNumber()
  propertyId?: number;
}

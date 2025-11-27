import { IsString, IsBoolean, IsInt, IsOptional, Min } from 'class-validator';

export class CreateTokenDto {
  @IsString()
  token: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  reqleft?: number;
}

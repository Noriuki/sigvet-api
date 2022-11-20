import { IsOptional, Min } from 'class-validator';

export class BaseDto {
  @Min(1)
  @IsOptional()
  id?: number;
}

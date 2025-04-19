import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class CreateExchangeDto {
  @IsString()
  @IsNotEmpty()
  from: string;

  @IsString()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  amount: string;

  @IsString()
  @IsOptional()
  extraId?: string;

  @IsString()
  @IsOptional()
  refundAddress?: string;

  @IsString()
  @IsOptional()
  refundExtraId?: string;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsOptional()
  contactEmail?: string;

  @IsString()
  @IsIn(['standard', 'fixed-rate'])
  flow: string = 'standard';
}
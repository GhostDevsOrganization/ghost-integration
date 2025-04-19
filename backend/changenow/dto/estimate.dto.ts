import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class EstimateParamsDto {
  @IsString()
  @IsNotEmpty()
  fromCurrency: string;

  @IsString()
  @IsNotEmpty()
  toCurrency: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d*\.?\d+$/, {
    message: 'Amount must be a valid number',
  })
  amount: string;
}
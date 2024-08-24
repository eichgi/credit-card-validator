import {IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class CreditCardDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(16)
  @MaxLength(16)
  readonly creditCard: string;
}
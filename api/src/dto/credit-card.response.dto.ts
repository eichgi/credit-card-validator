import {Exclude, Expose} from "class-transformer";

@Exclude()
export class CreditCardResponseDto {
  @Expose()
  creditCard: string;

  @Expose()
  isValid: boolean;
}
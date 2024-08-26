import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreditCardDto {
  @ApiProperty({
    example: '4485275742308327',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(16)
  @MaxLength(16)
  readonly creditCard: string;
}

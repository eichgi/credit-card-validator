import { Injectable } from '@nestjs/common';
import { CreditCardDto } from './dto/credit-card.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  validateCreditCard(creditCardDto: CreditCardDto) {
    const { creditCard } = creditCardDto;

    const arr = `${creditCard}`
      .split('')
      .reverse()
      .map((x) => Number.parseInt(x));

    const lastDigit = arr.shift();

    let sum = arr.reduce(
      (acc, val, i) =>
        i % 2 !== 0 ? acc + val : acc + ((val *= 2) > 9 ? val - 9 : val),
      0,
    );
    sum += lastDigit;

    const isValid = sum % 10 === 0;

    return {
      isValid,
      creditCard,
    };
  }
}

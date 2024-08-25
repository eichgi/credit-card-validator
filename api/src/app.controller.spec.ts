import {Test, TestingModule} from '@nestjs/testing';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CreditCardDto} from "./dto/credit-card.dto";
import {CreditCardResponseDto} from "./dto/credit-card.response.dto";

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('creditCard', () => {
    it('4485275742308327 should return valid credit card', async () => {
      const creditCardDto: CreditCardDto = {
        "creditCard": "4485275742308327"
      };

      const expectedOutput: CreditCardResponseDto = {
        ...creditCardDto,
        "isValid": true
      };

      const output = await appController.validateCreditCard(creditCardDto);
      expect(output).toEqual(expectedOutput);
    });

    it('4485275742308328 should return invalid credit card', async () => {
      const creditCardDto: CreditCardDto = {
        "creditCard": "4485275742308328"
      };

      const expectedOutput: CreditCardResponseDto = {
        ...creditCardDto,
        "isValid": false
      };

      const output = await appController.validateCreditCard(creditCardDto);
      expect(output).toEqual(expectedOutput);
    });
  });
});

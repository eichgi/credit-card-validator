import {Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Res} from '@nestjs/common';
import {AppService} from './app.service';
import {CreditCardDto} from "./dto/credit-card.dto";
import {CreditCardResponseDto} from "./dto/credit-card.response.dto";
import {plainToInstance} from "class-transformer";

@Controller('/v1')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/validate/cc')
  @HttpCode(200)
  async validateCreditCard(
    @Body() creditCardDto: CreditCardDto,
  ): Promise<CreditCardResponseDto> {
    {
      try {
        const response = this.appService.validateCreditCard(creditCardDto);
        return plainToInstance(CreditCardResponseDto, response);
      } catch (error) {
        throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: error.message
          },
          HttpStatus.BAD_REQUEST);
      }
    }
  }
}

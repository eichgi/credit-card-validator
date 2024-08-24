import {Body, Controller, Get, HttpException, HttpStatus, Post, Res, UnauthorizedException} from '@nestjs/common';
import {AppService} from './app.service';
import {CreditCardDto} from "./dto/credit-card.dto";
import {Response} from 'express';
import {CreditCardResponseDto} from "./dto/credit-card.response.dto";
import {plainToInstance} from "class-transformer";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/validate/cc')
  async validateCreditCard(
    @Body() creditCardDto: CreditCardDto,
    @Res({passthrough: true}) res: Response
  ): Promise<CreditCardResponseDto | Response> {
    try {
      const response = this.appService.validateCreditCard(creditCardDto);
      return plainToInstance(CreditCardResponseDto, response);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: error.message
      })
    }
  }
}

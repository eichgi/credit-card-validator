import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreditCardDto } from './dto/credit-card.dto';
import { CreditCardResponseDto } from './dto/credit-card.response.dto';
import { plainToInstance } from 'class-transformer';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/validate/cc')
  @ApiResponse({
    status: 200,
    description: 'The credit card has been validated.',
  })
  @ApiResponse({
    status: 400,
    description: 'An error ocurred while validating the credit card.',
  })
  @ApiBody({
    type: CreditCardDto,
    description: 'The credit card input',
  })
  @HttpCode(200)
  async validateCreditCard(
    @Body() creditCardDto: CreditCardDto,
  ): Promise<CreditCardResponseDto> {
    {
      try {
        const response = this.appService.validateCreditCard(creditCardDto);
        return plainToInstance(CreditCardResponseDto, response);
      } catch (error) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: error.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}

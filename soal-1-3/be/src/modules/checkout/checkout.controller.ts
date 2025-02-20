import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { Response } from 'express';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  async checkout(
    @Body() body: { productName: string; price: number; voucher: number },
    @Res() res: Response,
  ) {
    try {
      const result = await this.checkoutService.checkoutWithVoucher(
        body.productName,
        body.price,
        body.voucher,
      );

      return res.status(HttpStatus.OK).json({
        status: 200,
        message: 'Checkout berhasil',
        data: result,
      });
    } catch (error) {
      return res.status(error.getStatus()).json(error.getResponse());
    }
  }
}

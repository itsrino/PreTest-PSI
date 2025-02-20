import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Checkout } from './checkout.entity';

@Injectable()
export class CheckoutService {
  constructor(
    @InjectRepository(Checkout)
    private checkoutRepository: Repository<Checkout>,
  ) {}

  async checkoutWithVoucher(
    productName: string,
    price: number,
    voucher: number,
  ): Promise<Checkout> {
    if (!productName || price == null || voucher == null) {
      throw new HttpException(
        { status: 400, message: 'Semua field harus diisi' },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (price <= 0) {
      throw new HttpException(
        { status: 400, message: 'Harga barang tidak valid' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const maxVoucher = price * 0.5;
    if (voucher > maxVoucher) {
      throw new HttpException(
        {
          status: 400,
          message: 'Voucher melebihi batas maksimal 50% dari harga barang',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingProduct = await this.checkoutRepository.findOne({
      where: { productName },
    });
    if (existingProduct) {
      throw new HttpException(
        {
          status: 400,
          message: 'Produk dengan nama ini sudah ada di database',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const discountedPrice = price - voucher;
      const pointsEarned = voucher * 0.02;

      const checkout = this.checkoutRepository.create({
        productName,
        originalPrice: price,
        discountedPrice,
        voucherUsed: voucher,
        pointsEarned,
      });

      const savedCheckout = await this.checkoutRepository.save(checkout);

      return savedCheckout;
    } catch (error) {
      throw new HttpException(
        {
          status: 500,
          message: 'Terjadi kesalahan server',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

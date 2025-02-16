import { Inject, Injectable } from '@nestjs/common';
import { CronExpression } from '@nestjs/schedule';
import { Cron } from 'croner';
import { Binance } from './providers';

@Injectable()
export class UGX {
  @Inject(Binance) private readonly binance: Binance;

  fiat = 'UGX' as const;

  constructor() {
    /**
     * Using croner instead of @nestjs/schedule
     * because of issue: https://github.com/kelektiv/node-cron/issues/805
     */
    new Cron(CronExpression.EVERY_5_MINUTES, () => {
      this.getBinanceData();
    });
  }

  async getBinanceData() {
    await this.binance.fetchData(this.fiat);
  }
}

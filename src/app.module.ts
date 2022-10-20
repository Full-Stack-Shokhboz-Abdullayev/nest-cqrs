import { Module } from '@nestjs/common';
import { BookModule } from 'src/business/book/book.module';
import { SmartHouseModule } from 'src/business/smart-house/smart-house.module';
import { ConfigurationModule } from 'src/core/config/configuration.module';

@Module({
  imports: [ConfigurationModule, BookModule],
})
export class AppModule {}

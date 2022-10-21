import { Module } from '@nestjs/common';
import { BookModule } from 'src/business/book-built-in/book.module';
import { NestEventModule } from 'src/business/book-built-in/lib/nest-event.module';
import { SmartHouseModule } from 'src/business/smart-house/smart-house.module';
import { ConfigurationModule } from 'src/core/config/configuration.module';

@Module({
  imports: [NestEventModule, ConfigurationModule, BookModule],
})
export class AppModule {}

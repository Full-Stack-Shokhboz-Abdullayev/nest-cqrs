import { Module } from '@nestjs/common';
import { BookConsumer } from 'src/business/book/book.consumer';
import { BookResolver } from 'src/business/book/book.resolver';
import { LoggerService } from 'src/business/book/logger.service';
import { BookRepository } from './book.repository';

@Module({
  providers: [LoggerService, BookRepository, BookConsumer, BookResolver],
})
export class BookModule {}

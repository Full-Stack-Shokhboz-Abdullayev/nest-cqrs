import { Module } from '@nestjs/common';
import { BookConsumer } from 'src/business/book-built-in/book.consumer';
import { BookRepository } from 'src/business/book-built-in/book.repository';
import { BookResolver } from 'src/business/book-built-in/book.resolver';
import { LoggerService } from 'src/business/book-built-in/logger.service';
import { OtherConsumer } from 'src/business/book-built-in/other.consumer';

@Module({
  providers: [
    LoggerService,
    BookRepository,
    BookConsumer,
    BookResolver,
    // OtherConsumer,
  ],
})
export class BookModule {}

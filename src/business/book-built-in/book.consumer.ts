import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { BookRepository } from 'src/business/book-built-in/book.repository';
import { ConsumerFor, On } from 'src/business/book-built-in/lib/decorators';
import { LoggerService } from 'src/business/book-built-in/logger.service';
import { ConsumerType } from 'src/business/book-built-in/typings/types';

@ConsumerFor(BookRepository)
@Injectable()
export class BookConsumer implements ConsumerType<BookRepository> {
  constructor(@Inject(LoggerService) private loggerService: LoggerService) {}

  @On()
  create(payload: string) {
    console.log('event with service', payload, this.loggerService.hello());
  }

  @On()
  delete(payload: { cool: string }) {
    console.log('event with service', payload);
  }
}

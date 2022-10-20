import { BookRepository } from './book.repository';
import { After, Consumer, ConsumerType } from './lib';
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { LoggerService } from 'src/business/book/logger.service';

@Injectable()
@Consumer(BookRepository)
export class BookConsumer implements ConsumerType<BookRepository> {
  constructor(@Inject(LoggerService) private loggerService: LoggerService) {}

  @After()
  create(out: string) {
    console.log('Event: ', out);
    console.log(this.loggerService.hello());
  }

  @After()
  delete(out: string) {
    console.log('Event - delete: ', out);
  }
}

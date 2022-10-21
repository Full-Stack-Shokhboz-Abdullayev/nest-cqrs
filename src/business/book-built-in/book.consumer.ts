import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { BookRepository } from 'src/business/book-built-in/book.repository';
import { ConsumerFor, On } from 'src/business/book-built-in/lib/decorators';
import { LoggerService } from 'src/business/book-built-in/logger.service';

@ConsumerFor(BookRepository)
@Injectable()
export class BookConsumer {
  constructor(@Inject(LoggerService) private loggerService: LoggerService) {}

  @On()
  create(out: string) {
    console.log('Event: ', out);
    console.log(this.loggerService.hello());
  }

  @On()
  delete(out: string) {
    console.log('Event - delete: ', out);
  }
}

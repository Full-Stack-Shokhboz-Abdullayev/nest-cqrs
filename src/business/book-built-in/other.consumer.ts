import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { On } from 'src/business/book-built-in/lib/decorators';
import { LoggerService } from 'src/business/book-built-in/logger.service';

@Injectable()
export class OtherConsumer {
  constructor(@Inject(LoggerService) private loggerService: LoggerService) {}

  @On()
  delete(out: string) {
    console.log('Other Event: ', out);
    console.log(this.loggerService.hello());
  }
}

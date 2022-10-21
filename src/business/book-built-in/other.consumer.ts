import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { ConsumerFor, On } from 'src/business/book-built-in/lib/decorators';
import { LoggerService } from 'src/business/book-built-in/logger.service';
import { OtherRepository } from 'src/business/book-built-in/other.repository';
import { ConsumerType } from 'src/business/book-built-in/typings/types';

@Injectable()
@ConsumerFor(OtherRepository)
export class OtherConsumer implements ConsumerType<OtherRepository> {
  constructor(@Inject(LoggerService) private loggerService: LoggerService) {}

  private roo() {
    return 'Man';
  }

  @On()
  create(payload: string) {
    console.log('Wahduuep oterh create', this.roo());
  }

  @On()
  delete(payload: { cool: string }) {
    console.log('Wahduuep oterh del');
  }
}

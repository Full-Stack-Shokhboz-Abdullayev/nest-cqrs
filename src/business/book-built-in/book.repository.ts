import { Injectable } from '@nestjs/common';
import { Watcher } from 'src/business/book-built-in/lib/decorators';

@Injectable()
@Watcher()
export class BookRepository {
  create(payload: { title: string }): string {
    console.log('create new data', payload);
    return JSON.stringify(payload);
  }

  delete(payload: number): string {
    console.log('create new data', payload);
    return JSON.stringify(payload);
  }
}

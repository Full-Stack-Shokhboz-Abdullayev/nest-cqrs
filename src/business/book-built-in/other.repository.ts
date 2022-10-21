import { Injectable } from '@nestjs/common';
import { Watcher } from 'src/business/book-built-in/lib/decorators';

@Injectable()
@Watcher()
export class OtherRepository {
  create(payload: { title: string }): string {
    console.log('create other data', payload);
    return JSON.stringify(payload);
  }

  delete(payload: number): {
    cool: string;
  } {
    console.log('del other data', payload);
    return {
      cool: 'yeah',
    };
  }
}

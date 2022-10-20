import { Injectable } from '@nestjs/common';
import { Action } from './lib';

@Injectable()
export class BookRepository {
  @Action()
  create(payload: { title: string }): string {
    console.log('create new data', payload);
    return JSON.stringify(payload);
  }

  @Action()
  delete(payload: number): string {
    console.log('create new data', payload);
    return JSON.stringify(payload);
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  hello() {
    return 'hello';
  }
}

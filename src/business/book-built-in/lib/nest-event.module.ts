import { Module, Global, NestModule } from '@nestjs/common';
import { NestEvent, NestEvent2 } from './nest-event';
import { DiscoveryModule } from '@nestjs-plus/discovery';
import { InjectNestEvent } from './decorators';
import { NEST_EVENT } from './constants';
import { NestEventEmitter } from './nest-event-emitter';

@Global()
@Module({
  imports: [DiscoveryModule],
  providers: [
    {
      provide: NEST_EVENT,
      useClass: NestEvent2,
    },
  ],
  exports: [
    {
      provide: NEST_EVENT,
      useClass: NestEvent2,
    },
  ],
})
export class NestEventModule implements NestModule {
  constructor(@InjectNestEvent() private readonly nestEvent: NestEvent2) {}

  async configure() {
    await this.nestEvent.configure();
  }
}

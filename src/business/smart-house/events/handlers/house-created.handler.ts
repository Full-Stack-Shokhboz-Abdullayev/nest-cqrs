import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { HouseCreatedEvent } from 'src/business/smart-house/events/impl/house-created.event';

@EventsHandler(HouseCreatedEvent)
export class HouseCreatedEventHandler
  implements IEventHandler<HouseCreatedEvent>
{
  handle(event: HouseCreatedEvent) {
    console.log('House Was Created, (creating activity)');
    console.log(event.params);
  }
}

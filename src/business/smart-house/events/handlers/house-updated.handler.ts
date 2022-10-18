import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { HouseUpdatedEvent } from 'src/business/smart-house/events/impl/house-updated.event';

@EventsHandler(HouseUpdatedEvent)
export class HouseUpdatedEventHandler
  implements IEventHandler<HouseUpdatedEvent>
{
  handle(event: HouseUpdatedEvent) {
    console.log('House Was Updated, (creating activity)');
    console.log(event.params);
  }
}

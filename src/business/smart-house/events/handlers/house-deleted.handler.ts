import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { HouseDeletedEvent } from 'src/business/smart-house/events/impl/house-deleted.event';

@EventsHandler(HouseDeletedEvent)
export class HouseDeletedEventHandler
  implements IEventHandler<HouseDeletedEvent>
{
  handle(event: HouseDeletedEvent) {
    console.log('House Was Deleted, (creating activity)');
    console.log(event.params);
  }
}

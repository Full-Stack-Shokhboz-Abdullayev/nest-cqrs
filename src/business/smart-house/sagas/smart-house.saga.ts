import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { UpdateHouseCommand } from 'src/business/smart-house/commands/impl/update-house.command';
import { HouseCreatedEvent } from 'src/business/smart-house/events/impl/house-created.event';

@Injectable()
export class SmartHouseSagas {
  @Saga()
  houseManuallyCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(HouseCreatedEvent),
      map(
        (event: HouseCreatedEvent) =>
          new UpdateHouseCommand({
            houseId: event.params.data.houseId,
            water: false,
            cameras: false,
            electricity: false,
            fireplace: false,
            gas: false,
          }),
      ),
    );
  };
}

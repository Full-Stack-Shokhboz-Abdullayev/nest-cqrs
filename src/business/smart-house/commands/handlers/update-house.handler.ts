import { Inject } from '@nestjs/common';
import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { ICommandHandler } from '@nestjs/cqrs/dist';
import { UpdateHouseCommand } from 'src/business/smart-house/commands/impl/update-house.command';
import {
  HouseUpdatedEvent,
  HouseUpdateFlow,
} from 'src/business/smart-house/events/impl/house-updated.event';
import { SmartHouseRepository } from 'src/business/smart-house/smart-house.repository';

@CommandHandler(UpdateHouseCommand)
export class UpdateHouseCommandHandler
  implements ICommandHandler<UpdateHouseCommand>
{
  constructor(
    @Inject(SmartHouseRepository)
    private repository: SmartHouseRepository,

    @Inject(EventBus)
    private eventBus: EventBus,
  ) {}

  async execute({ params: { houseId, ...params } }: UpdateHouseCommand) {
    const { id, ...smartHouse } = this.repository.update(houseId, {
      ...params,
    });

    this.eventBus.publish(
      new HouseUpdatedEvent({
        context: {
          message: 'House is updated at ' + new Date(),
          flow: HouseUpdateFlow.MANUAL,
        },
        data: { houseId: id, ...smartHouse },
      }),
    );
    return { id, ...smartHouse };
  }
}

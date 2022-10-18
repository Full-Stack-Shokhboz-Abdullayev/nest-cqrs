import { Inject } from '@nestjs/common';
import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { ICommandHandler } from '@nestjs/cqrs/dist';
import { DeleteHouseCommand } from 'src/business/smart-house/commands/impl/delete-house.command';
import {
  HouseDeletedEvent,
  HouseDeleteFlow,
} from 'src/business/smart-house/events/impl/house-deleted.event';
import {} from 'src/business/smart-house/events/impl/house-updated.event';
import { SmartHouseRepository } from 'src/business/smart-house/smart-house.repository';

@CommandHandler(DeleteHouseCommand)
export class DeleteHouseCommandHandler
  implements ICommandHandler<DeleteHouseCommand>
{
  constructor(
    @Inject(SmartHouseRepository)
    private repository: SmartHouseRepository,

    @Inject(EventBus)
    private eventBus: EventBus,
  ) {}

  async execute({ params: { houseId } }: DeleteHouseCommand) {
    const success = this.repository.delete(houseId);

    this.eventBus.publish(
      new HouseDeletedEvent({
        context: {
          message: 'House is updated at ' + new Date(),
          flow: HouseDeleteFlow.MANUAL,
        },
        data: { houseId },
      }),
    );
    return { success };
  }
}

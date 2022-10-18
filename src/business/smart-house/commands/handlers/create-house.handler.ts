import { Inject } from '@nestjs/common';
import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { ICommandHandler } from '@nestjs/cqrs/dist';
import { CreateHouseCommand } from 'src/business/smart-house/commands/impl/create-house.command';
import {
  HouseCreatedEvent,
  HouseCreateFlow,
} from 'src/business/smart-house/events/impl/house-created.event';
import { SmartHouseRepository } from 'src/business/smart-house/smart-house.repository';

@CommandHandler(CreateHouseCommand)
export class CreateHouseCommandHandler
  implements ICommandHandler<CreateHouseCommand>
{
  constructor(
    @Inject(SmartHouseRepository)
    private repository: SmartHouseRepository,

    @Inject(EventBus)
    private eventBus: EventBus,
  ) {}

  async execute({ params }: CreateHouseCommand) {
    const { id, ...smartHouse } = this.repository.create(params);

    this.eventBus.publish(
      new HouseCreatedEvent({
        context: {
          message: 'House is created at ' + new Date(),
          flow: HouseCreateFlow.MANUAL,
        },
        data: { houseId: id, ...smartHouse },
      }),
    );
    return { id, ...smartHouse };
  }
}

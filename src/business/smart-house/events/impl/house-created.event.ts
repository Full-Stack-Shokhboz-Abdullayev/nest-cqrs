import { UpdateHouseInput } from 'src/business/smart-house/dto/mutation.dto';
import { HouseEvent } from 'src/business/smart-house/events/impl/utils/house-event.util';

export enum HouseCreateFlow {
  MANUAL = 'MANUAL',
}

export class HouseCreatedEvent extends HouseEvent<
  UpdateHouseInput,
  HouseCreateFlow
> {}

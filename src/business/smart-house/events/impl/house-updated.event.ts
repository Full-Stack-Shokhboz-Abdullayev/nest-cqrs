import { UpdateHouseInput } from 'src/business/smart-house/dto/mutation.dto';
import { HouseEvent } from 'src/business/smart-house/events/impl/utils/house-event.util';

export enum HouseUpdateFlow {
  AUTO = 'AUTO',
  MANUAL = 'MANUAL',
}

export class HouseUpdatedEvent extends HouseEvent<
  UpdateHouseInput,
  HouseUpdateFlow
> {}

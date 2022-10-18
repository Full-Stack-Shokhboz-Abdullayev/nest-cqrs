import { DeleteHouseInput } from 'src/business/smart-house/dto/mutation.dto';
import { HouseEvent } from 'src/business/smart-house/events/impl/utils/house-event.util';

export enum HouseDeleteFlow {
  AUTO = 'AUTO',
  MANUAL = 'MANUAL',
}
export class HouseDeletedEvent extends HouseEvent<
  DeleteHouseInput,
  HouseDeleteFlow
> {}

import { UpdateHouseInput } from 'src/business/smart-house/dto/mutation.dto';

export class UpdateHouseCommand {
  constructor(public params: UpdateHouseInput) {}
}

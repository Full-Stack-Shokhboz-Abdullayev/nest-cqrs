import { CreateHouseInput } from 'src/business/smart-house/dto/mutation.dto';

export class CreateHouseCommand {
  constructor(public params: CreateHouseInput) {}
}

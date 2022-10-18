import { DeleteHouseInput } from 'src/business/smart-house/dto/mutation.dto';

export class DeleteHouseCommand {
  constructor(public params: DeleteHouseInput) {}
}

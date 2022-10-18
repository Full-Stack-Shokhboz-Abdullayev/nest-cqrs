import { GetHouseInput } from 'src/business/smart-house/dto/query.dto';

export class GetHouseQuery {
  constructor(public params: GetHouseInput) {}
}

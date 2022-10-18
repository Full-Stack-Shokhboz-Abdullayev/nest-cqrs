import { GetHouseQueryHandler } from 'src/business/smart-house/queries/handlers/get-house.handler';
import { GetHousesQueryHandler } from 'src/business/smart-house/queries/handlers/get-houses.handler';

export const SmartHouseQueryHandlers = [
  GetHousesQueryHandler,
  GetHouseQueryHandler,
];

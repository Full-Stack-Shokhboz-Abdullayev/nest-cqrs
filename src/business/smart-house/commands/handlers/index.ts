import { CreateHouseCommandHandler } from 'src/business/smart-house/commands/handlers/create-house.handler';
import { DeleteHouseCommandHandler } from 'src/business/smart-house/commands/handlers/delete-house.handler';
import { UpdateHouseCommandHandler } from 'src/business/smart-house/commands/handlers/update-house.handler';

export const SmartHouseCommandHandlers = [
  CreateHouseCommandHandler,
  UpdateHouseCommandHandler,
  DeleteHouseCommandHandler,
];

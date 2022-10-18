import { HouseCreatedEventHandler } from 'src/business/smart-house/events/handlers/house-created.handler';
import { HouseDeletedEventHandler } from 'src/business/smart-house/events/handlers/house-deleted.handler';
import { HouseUpdatedEventHandler } from 'src/business/smart-house/events/handlers/house-updated.handler';

export const SmartHouseEventHandlers = [
  HouseCreatedEventHandler,
  HouseUpdatedEventHandler,
  HouseDeletedEventHandler,
];

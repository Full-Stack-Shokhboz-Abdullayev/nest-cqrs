import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SmartHouseCommandHandlers } from 'src/business/smart-house/commands/handlers';
import { SmartHouseEventHandlers } from 'src/business/smart-house/events/handlers';
import { SmartHouseQueryHandlers } from 'src/business/smart-house/queries/handlers';
import { SmartHouseResolver } from 'src/business/smart-house/resolvers/smart-house.resolver';
import { SmartHouseSagas } from 'src/business/smart-house/sagas/smart-house.saga';
import { SmartHouseRepository } from 'src/business/smart-house/smart-house.repository';

@Module({
  imports: [CqrsModule],
  providers: [
    SmartHouseResolver,
    SmartHouseRepository,
    ...SmartHouseCommandHandlers,
    ...SmartHouseEventHandlers,
    ...SmartHouseQueryHandlers,
    SmartHouseSagas,
  ],
})
export class SmartHouseModule {}

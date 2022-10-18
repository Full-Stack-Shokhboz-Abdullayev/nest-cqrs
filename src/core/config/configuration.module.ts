import { Global, Module } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus } from '@nestjs/cqrs';
import { GraphModule } from 'src/core/gql/graph.module';

@Global()
@Module({
  imports: [GraphModule, CqrsModule],
  providers: [CommandBus, EventBus],
  exports: [CqrsModule, CommandBus, EventBus],
})
export class ConfigurationModule {}

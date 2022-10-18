import { Module } from '@nestjs/common';
import { SmartHouseModule } from 'src/business/smart-house/smart-house.module';
import { ConfigurationModule } from 'src/core/config/configuration.module';

@Module({
  imports: [ConfigurationModule, SmartHouseModule],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigurationModule } from './common/config/config.module';
import { BusinessLogicModule } from './modules/business-logic.module';
import { DatabaseModule } from './common/database/database.module';

@Module({
  imports: [ConfigurationModule, DatabaseModule, BusinessLogicModule],
})
export class AppModule {}

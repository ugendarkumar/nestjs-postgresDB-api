import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssociatesController } from './associates/associates.controller';
import { AssociatesService } from './associates/associates.service';
import { SpecializationService } from './specialization/specialization.service';
import { SpecializationController } from './specialization/specialization.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController, AssociatesController, SpecializationController],
  providers: [AppService, AssociatesService, SpecializationService],
})
export class AppModule { }

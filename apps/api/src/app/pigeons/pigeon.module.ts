import { Module } from '@nestjs/common';
import { PigeonsService } from './pigeons.service';
import { PigeonsController } from './pigeons.controller';

@Module({
  providers: [PigeonsService],
  controllers: [PigeonsController]
})
export class PigeonModule {}

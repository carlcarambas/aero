import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PigeonModule } from './pigeons/pigeon.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PigeonModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PigeonsService } from './pigeons.service';
import { Pigeon as PigeonModel, Prisma } from '@prisma/client';

@Controller('pigeons')
export class PigeonsController {
  constructor(private readonly pigeonsService: PigeonsService) {}

  @Post()
  async create(@Body() data: Prisma.PigeonCreateInput): Promise<PigeonModel> {
    return this.pigeonsService.create(data);
  }

  @Get()
  async findAll(): Promise<PigeonModel[]> {
    return this.pigeonsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PigeonModel | null> {
    return this.pigeonsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Prisma.PigeonUpdateInput
  ): Promise<PigeonModel> {
    return this.pigeonsService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<PigeonModel> {
    return this.pigeonsService.remove(id);
  }
}

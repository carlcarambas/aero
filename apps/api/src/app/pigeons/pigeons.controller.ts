import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { PigeonsService } from './pigeons.service';
import { Pigeon as PigeonModel, Prisma } from '@prisma/client';
import { CreatePigeonDto } from './pigeons.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('pigeons')
@Controller('pigeons')
export class PigeonsController {
  constructor(private readonly pigeonsService: PigeonsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Pigeon created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createv1(@Body() data: CreatePigeonDto) {
    // TODO should get the ownerId from the request
    const ownerId = '6805f27f9d314aa072dad66a';
    return this.pigeonsService.create({ ...data, ownerId });
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    })
  )
  @ApiResponse({
    status: 201,
    description: 'Pigeon created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() data: CreatePigeonDto) {
    // TODO should get the ownerId from the request
    const ownerId = '6805f27f9d314aa072dad66a';
    return this.pigeonsService.create({ ...data, ownerId });
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

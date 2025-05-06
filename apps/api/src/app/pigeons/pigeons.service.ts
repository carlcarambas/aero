import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Pigeon, Prisma } from '@prisma/client';
import { CreatePigeonDto } from './pigeons.dto';

@Injectable()
export class PigeonsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Pigeon[]> {
    return this.prisma.pigeon.findMany({
      include: {
        owner: true,
      },
    });
  }

  async findOne(id: string): Promise<Pigeon | null> {
    return this.prisma.pigeon.findUnique({
      where: { id },
      include: {
        owner: true,
        raceResults: {
          include: {
            race: true,
          },
        },
      },
    });
  }

  async create(createPigeonDto: CreatePigeonDto) {
    const { ownerId, ...pigeonData } = createPigeonDto;
    return this.prisma.pigeon.create({
      data: {
        name: pigeonData.name,
        breed: pigeonData.breed,
        age: pigeonData.age,
        color: pigeonData.color,
        ownerId,
      },
      include: { owner: true },
    });
  }

  async update(id: string, data: Prisma.PigeonUpdateInput): Promise<Pigeon> {
    return this.prisma.pigeon.update({
      where: { id },
      data,
      include: {
        owner: true,
      },
    });
  }

  async remove(id: string): Promise<Pigeon> {
    return this.prisma.pigeon.delete({
      where: { id },
    });
  }
}

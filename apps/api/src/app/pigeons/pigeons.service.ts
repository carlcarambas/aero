import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Pigeon, Prisma } from '@prisma/client';

@Injectable()
export class PigeonsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Pigeon[]> {
    return this.prisma.pigeon.findMany({
      include: {
        owner: true,
        // breeder: true,
      },
    });
  }

  async findOne(id: string): Promise<Pigeon | null> {
    return this.prisma.pigeon.findUnique({
      where: { id },
      include: {
        owner: true,
        // breeder: true,
        raceResults: {
          include: {
            race: true,
          },
        },
      },
    });
  }

  async create(data: Prisma.PigeonCreateInput): Promise<Pigeon> {
    return this.prisma.pigeon.create({
      data,
      include: {
        owner: true,
        // breeder: true,
      },
    });
  }

  async update(id: string, data: Prisma.PigeonUpdateInput): Promise<Pigeon> {
    return this.prisma.pigeon.update({
      where: { id },
      data,
      include: {
        owner: true,
        // breeder: true,
      },
    });
  }

  async remove(id: string): Promise<Pigeon> {
    return this.prisma.pigeon.delete({
      where: { id },
    });
  }
}

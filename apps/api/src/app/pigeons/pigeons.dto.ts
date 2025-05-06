import {
  IsNumber,
  IsString,
  IsEnum,
  IsOptional,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePigeonDto {
  @ApiProperty({
    description: 'The key associated with the pigeon',
    example: 'language',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The age of the pigeon',
    example: 2,
  })
  @IsNumber()
  age: number;

  @ApiProperty({
    description: 'The breed of the pigeon',
    example: 'Fantail',
  })
  @IsString()
  breed: string;

  @ApiProperty({
    description: 'The color of the pigeon',
    example: 'Blue',
  })
  @IsString()
  color: string;

  @ApiProperty({
    description: 'The gender of the pigeon',
    example: 'male',
  })
  @IsEnum(['male', 'female'])
  gender: 'male' | 'female';

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  ownerId?: string;

  @ApiProperty({
    description: "The URLs of the pigeon's images",
    example: [
      'https://example.com/pigeon1.jpg',
      'https://example.com/pigeon2.jpg',
      'https://example.com/pigeon3.jpg',
    ],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  imageUrls?: string[];

  @ApiProperty({
    description: 'The date of birth of the pigeon',
    example: '2020-01-01',
    required: false,
  })
  @IsString()
  @IsOptional()
  dateOfBirth?: string;

  @ApiProperty({
    description: "The ID of the pigeon's father",
    example: 'fatherId',
    required: false,
  })
  @IsString()
  @IsOptional()
  fatherId?: string;

  @ApiProperty({
    description: "The ID of the pigeon's mother",
    example: 'motherId',
    required: false,
  })
  @IsString()
  @IsOptional()
  motherId?: string;
}

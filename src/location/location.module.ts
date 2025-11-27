import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { TokenModule } from '../token/token.module';
import { Location } from '../entities/location.entity';
import { Character } from '../entities/character.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location, Character]), TokenModule],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService],
})
export class LocationModule {}

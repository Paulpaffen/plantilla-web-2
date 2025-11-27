import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { TokenModule } from '../token/token.module';
import { LocationModule } from '../location/location.module';
import { Character } from '../entities/character.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Character]), TokenModule, LocationModule],
  controllers: [CharacterController],
  providers: [CharacterService],
  exports: [CharacterService],
})
export class CharacterModule {}

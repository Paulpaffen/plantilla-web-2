import { Controller, Post, Patch, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CharacterService } from './character.service';
import { TokenAuthGuard } from '../guards/token-auth.guard';
import { CreateCharacterDto } from './dto/create-character.dto';
import { LocationService } from '../location/location.service';

@Controller('character')
@UseGuards(TokenAuthGuard)
export class CharacterController {
  constructor(
    private readonly characterService: CharacterService,
    private readonly locationService: LocationService,
  ) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto);
  }

  @Patch(':id/favorites/:locationId')
  async addFavorite(
    @Param('id', ParseIntPipe) id: number,
    @Param('locationId', ParseIntPipe) locationId: number,
  ) {
    // Verificar que la locación existe
    await this.locationService.findOne(locationId);
    
    return this.characterService.addFavoriteLocation(id, locationId);
  }
}

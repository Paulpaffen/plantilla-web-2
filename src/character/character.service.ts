import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from '../entities/character.entity';
import { CreateCharacterDto } from './dto/create-character.dto';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
  ) {}

  async create(createCharacterDto: CreateCharacterDto): Promise<Character> {
    const character = this.characterRepository.create(createCharacterDto);
    return await this.characterRepository.save(character);
  }

  async addFavoriteLocation(characterId: number, locationId: number): Promise<Character> {
    const character = await this.characterRepository.findOne({
      where: { id: characterId },
      relations: ['favPlaces'],
    });

    if (!character) {
      throw new Error(`El personaje con ID ${characterId} no existe`);
    }

    // Verificar que la ubicación existe (se hará en el servicio de location)
    if (!character.favPlaces) {
      character.favPlaces = [];
    }

    // Evitar duplicados
    const alreadyExists = character.favPlaces.some(loc => loc.id === locationId);
    if (alreadyExists) {
      return character;
    }

    character.favPlaces.push({ id: locationId } as any);
    return await this.characterRepository.save(character);
  }
}

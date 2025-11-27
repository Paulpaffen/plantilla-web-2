import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../entities/location.entity';
import { Character } from '../entities/character.entity';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const { ownerId, ...locationData } = createLocationDto;

    let owner: Character | null = null;

    if (ownerId) {
      // Verificar que el dueño existe
      owner = await this.characterRepository.findOne({
        where: { id: ownerId },
        relations: ['property'],
      });

      if (!owner) {
        throw new NotFoundException(`El personaje con ID ${ownerId} no existe`);
      }

      // Verificar que el dueño no posee otra propiedad
      if (owner.property) {
        throw new BadRequestException(
          `El personaje con ID ${ownerId} ya posee la propiedad "${owner.property.name}". No puede tener más de una propiedad.`
        );
      }
    }

    const location = this.locationRepository.create({
      ...locationData,
      ...(owner && { owner }),
    });

    return await this.locationRepository.save(location);
  }

  async findAll(): Promise<Location[]> {
    return await this.locationRepository.find({
      relations: ['favCharacters'],
    });
  }

  async findOne(id: number): Promise<Location> {
    const location = await this.locationRepository.findOne({
      where: { id },
    });

    if (!location) {
      throw new NotFoundException(`La locación con ID ${id} no existe`);
    }

    return location;
  }
}

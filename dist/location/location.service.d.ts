import { Repository } from 'typeorm';
import { Location } from '../entities/location.entity';
import { Character } from '../entities/character.entity';
import { CreateLocationDto } from './dto/create-location.dto';
export declare class LocationService {
    private readonly locationRepository;
    private readonly characterRepository;
    constructor(locationRepository: Repository<Location>, characterRepository: Repository<Character>);
    create(createLocationDto: CreateLocationDto): Promise<Location>;
    findAll(): Promise<Location[]>;
    findOne(id: number): Promise<Location>;
}

import { Repository } from 'typeorm';
import { Character } from '../entities/character.entity';
import { CreateCharacterDto } from './dto/create-character.dto';
export declare class CharacterService {
    private readonly characterRepository;
    constructor(characterRepository: Repository<Character>);
    create(createCharacterDto: CreateCharacterDto): Promise<Character>;
    addFavoriteLocation(characterId: number, locationId: number): Promise<Character>;
}

import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { LocationService } from '../location/location.service';
export declare class CharacterController {
    private readonly characterService;
    private readonly locationService;
    constructor(characterService: CharacterService, locationService: LocationService);
    create(createCharacterDto: CreateCharacterDto): Promise<import("../entities/character.entity").Character>;
    addFavorite(id: number, locationId: number): Promise<import("../entities/character.entity").Character>;
}

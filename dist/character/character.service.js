"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const character_entity_1 = require("../entities/character.entity");
let CharacterService = class CharacterService {
    characterRepository;
    constructor(characterRepository) {
        this.characterRepository = characterRepository;
    }
    async create(createCharacterDto) {
        const character = this.characterRepository.create(createCharacterDto);
        return await this.characterRepository.save(character);
    }
    async addFavoriteLocation(characterId, locationId) {
        const character = await this.characterRepository.findOne({
            where: { id: characterId },
            relations: ['favPlaces'],
        });
        if (!character) {
            throw new Error(`El personaje con ID ${characterId} no existe`);
        }
        if (!character.favPlaces) {
            character.favPlaces = [];
        }
        const alreadyExists = character.favPlaces.some(loc => loc.id === locationId);
        if (alreadyExists) {
            return character;
        }
        character.favPlaces.push({ id: locationId });
        return await this.characterRepository.save(character);
    }
    async calculateTaxes(characterId) {
        const character = await this.characterRepository.findOne({
            where: { id: characterId },
            relations: ['property'],
        });
        if (!character) {
            throw new Error(`El personaje con ID ${characterId} no existe`);
        }
        if (!character.property) {
            return { taxDebt: 0 };
        }
        const COEF = character.employee ? 0.08 : 0.03;
        const taxDebt = Number(character.property.cost) * (1 + COEF);
        return { taxDebt: Number(taxDebt.toFixed(2)) };
    }
};
exports.CharacterService = CharacterService;
exports.CharacterService = CharacterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(character_entity_1.Character)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CharacterService);
//# sourceMappingURL=character.service.js.map
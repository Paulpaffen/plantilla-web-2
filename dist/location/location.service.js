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
exports.LocationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const location_entity_1 = require("../entities/location.entity");
const character_entity_1 = require("../entities/character.entity");
let LocationService = class LocationService {
    locationRepository;
    characterRepository;
    constructor(locationRepository, characterRepository) {
        this.locationRepository = locationRepository;
        this.characterRepository = characterRepository;
    }
    async create(createLocationDto) {
        const { ownerId, ...locationData } = createLocationDto;
        let owner = null;
        if (ownerId) {
            owner = await this.characterRepository.findOne({
                where: { id: ownerId },
                relations: ['property'],
            });
            if (!owner) {
                throw new common_1.NotFoundException(`El personaje con ID ${ownerId} no existe`);
            }
            if (owner.property) {
                throw new common_1.BadRequestException(`El personaje con ID ${ownerId} ya posee la propiedad "${owner.property.name}". No puede tener más de una propiedad.`);
            }
        }
        const location = this.locationRepository.create({
            ...locationData,
            ...(owner && { owner }),
        });
        return await this.locationRepository.save(location);
    }
    async findAll() {
        return await this.locationRepository.find({
            relations: ['favCharacters'],
        });
    }
    async findOne(id) {
        const location = await this.locationRepository.findOne({
            where: { id },
        });
        if (!location) {
            throw new common_1.NotFoundException(`La locación con ID ${id} no existe`);
        }
        return location;
    }
};
exports.LocationService = LocationService;
exports.LocationService = LocationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(location_entity_1.Location)),
    __param(1, (0, typeorm_1.InjectRepository)(character_entity_1.Character)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], LocationService);
//# sourceMappingURL=location.service.js.map
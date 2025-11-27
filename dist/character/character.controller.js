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
exports.CharacterController = void 0;
const common_1 = require("@nestjs/common");
const character_service_1 = require("./character.service");
const token_auth_guard_1 = require("../guards/token-auth.guard");
const create_character_dto_1 = require("./dto/create-character.dto");
const location_service_1 = require("../location/location.service");
let CharacterController = class CharacterController {
    characterService;
    locationService;
    constructor(characterService, locationService) {
        this.characterService = characterService;
        this.locationService = locationService;
    }
    create(createCharacterDto) {
        return this.characterService.create(createCharacterDto);
    }
    async addFavorite(id, locationId) {
        await this.locationService.findOne(locationId);
        return this.characterService.addFavoriteLocation(id, locationId);
    }
    calculateTaxes(id) {
        return this.characterService.calculateTaxes(id);
    }
};
exports.CharacterController = CharacterController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_character_dto_1.CreateCharacterDto]),
    __metadata("design:returntype", void 0)
], CharacterController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id/favorites/:locationId'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('locationId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CharacterController.prototype, "addFavorite", null);
__decorate([
    (0, common_1.Get)(':id/taxes'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CharacterController.prototype, "calculateTaxes", null);
exports.CharacterController = CharacterController = __decorate([
    (0, common_1.Controller)('character'),
    (0, common_1.UseGuards)(token_auth_guard_1.TokenAuthGuard),
    __metadata("design:paramtypes", [character_service_1.CharacterService,
        location_service_1.LocationService])
], CharacterController);
//# sourceMappingURL=character.controller.js.map
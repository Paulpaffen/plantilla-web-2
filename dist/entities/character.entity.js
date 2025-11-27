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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
const typeorm_1 = require("typeorm");
const location_entity_1 = require("./location.entity");
let Character = class Character {
    id;
    name;
    salary;
    employee;
    property;
    favPlaces;
};
exports.Character = Character;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Character.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Character.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Character.prototype, "salary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Character.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => location_entity_1.Location, (location) => location.owner, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", location_entity_1.Location)
], Character.prototype, "property", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => location_entity_1.Location, (location) => location.favCharacters),
    (0, typeorm_1.JoinTable)({
        name: 'favorites',
        joinColumn: { name: 'characterId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'locationId', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Character.prototype, "favPlaces", void 0);
exports.Character = Character = __decorate([
    (0, typeorm_1.Entity)('characters')
], Character);
//# sourceMappingURL=character.entity.js.map
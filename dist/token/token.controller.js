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
exports.TokenController = void 0;
const common_1 = require("@nestjs/common");
const token_service_1 = require("./token.service");
const create_token_dto_1 = require("./dto/create-token.dto");
let TokenController = class TokenController {
    tokenService;
    constructor(tokenService) {
        this.tokenService = tokenService;
    }
    create(createTokenDto) {
        return this.tokenService.create(createTokenDto);
    }
    canUseToken(idToken) {
        return this.tokenService.canUseToken(idToken);
    }
    reduceReqLeft(idToken) {
        return this.tokenService.reduceReqLeft(idToken);
    }
};
exports.TokenController = TokenController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_token_dto_1.CreateTokenDto]),
    __metadata("design:returntype", void 0)
], TokenController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':idToken'),
    __param(0, (0, common_1.Param)('idToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TokenController.prototype, "canUseToken", null);
__decorate([
    (0, common_1.Patch)('reduce/:idToken'),
    __param(0, (0, common_1.Param)('idToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TokenController.prototype, "reduceReqLeft", null);
exports.TokenController = TokenController = __decorate([
    (0, common_1.Controller)('token'),
    __metadata("design:paramtypes", [token_service_1.TokenService])
], TokenController);
//# sourceMappingURL=token.controller.js.map
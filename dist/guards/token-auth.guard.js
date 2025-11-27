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
exports.TokenAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const token_service_1 = require("../token/token.service");
let TokenAuthGuard = class TokenAuthGuard {
    tokenService;
    constructor(tokenService) {
        this.tokenService = tokenService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const tokenId = this.extractTokenFromHeader(request);
        if (!tokenId) {
            throw new common_1.UnauthorizedException('Token no proporcionado en el header Authorization');
        }
        const validation = await this.tokenService.canUseToken(tokenId);
        if (!validation.valid) {
            throw new common_1.UnauthorizedException(validation.reason || 'Token inválido');
        }
        await this.tokenService.reduceReqLeft(tokenId);
        return true;
    }
    extractTokenFromHeader(request) {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return undefined;
        }
        const [type, token] = authHeader.split(' ');
        return type === 'Bearer' ? token : undefined;
    }
};
exports.TokenAuthGuard = TokenAuthGuard;
exports.TokenAuthGuard = TokenAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [token_service_1.TokenService])
], TokenAuthGuard);
//# sourceMappingURL=token-auth.guard.js.map
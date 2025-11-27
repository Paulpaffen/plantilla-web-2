import { CanActivate, ExecutionContext } from '@nestjs/common';
import { TokenService } from '../token/token.service';
export declare class TokenAuthGuard implements CanActivate {
    private readonly tokenService;
    constructor(tokenService: TokenService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}

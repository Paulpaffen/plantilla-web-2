import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create-token.dto';
export declare class TokenController {
    private readonly tokenService;
    constructor(tokenService: TokenService);
    create(createTokenDto: CreateTokenDto): Promise<import("../entities/apiToken.entity").ApiToken>;
    canUseToken(idToken: string): Promise<{
        valid: boolean;
        token?: import("../entities/apiToken.entity").ApiToken;
        reason?: string;
    }>;
    reduceReqLeft(idToken: string): Promise<import("../entities/apiToken.entity").ApiToken>;
}

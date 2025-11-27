import { Repository } from 'typeorm';
import { ApiToken } from '../entities/apiToken.entity';
import { CreateTokenDto } from './dto/create-token.dto';
export declare class TokenService {
    private readonly tokenRepository;
    constructor(tokenRepository: Repository<ApiToken>);
    create(createTokenDto: CreateTokenDto): Promise<ApiToken>;
    canUseToken(idToken: string): Promise<{
        valid: boolean;
        token?: ApiToken;
        reason?: string;
    }>;
    reduceReqLeft(idToken: string): Promise<ApiToken>;
}

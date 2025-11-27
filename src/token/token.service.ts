import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiToken } from '../entities/apiToken.entity';
import { CreateTokenDto } from './dto/create-token.dto';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(ApiToken)
    private readonly tokenRepository: Repository<ApiToken>,
  ) {}

  async create(createTokenDto: CreateTokenDto): Promise<ApiToken> {
    const token = this.tokenRepository.create(createTokenDto);
    return await this.tokenRepository.save(token);
  }

  async canUseToken(idToken: string): Promise<{ valid: boolean; token?: ApiToken; reason?: string }> {
    const token = await this.tokenRepository.findOne({
      where: { id: idToken },
    });

    if (!token) {
      return { valid: false, reason: 'Token no encontrado' };
    }

    if (!token.isActive) {
      return { valid: false, token, reason: 'Token inactivo' };
    }

    if (token.reqleft <= 0) {
      return { valid: false, token, reason: 'reqleft agotados, crea un nuevo token para poder seguir operando' };
    }

    return { valid: true, token };
  }

  async reduceReqLeft(idToken: string): Promise<ApiToken> {
    const token = await this.tokenRepository.findOne({
      where: { id: idToken },
    });

    if (!token) {
      throw new NotFoundException(`Token not found`);
    }

    if (token.reqleft > 0) {
      token.reqleft -= 1;
    }

    return await this.tokenRepository.save(token);
  }
}

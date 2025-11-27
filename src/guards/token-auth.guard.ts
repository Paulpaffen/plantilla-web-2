import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from '../token/token.service';

@Injectable()
export class TokenAuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const tokenId = this.extractTokenFromHeader(request);

    if (!tokenId) {
      throw new UnauthorizedException('Token no proporcionado en el header Authorization');
    }

    const validation = await this.tokenService.canUseToken(tokenId);

    if (!validation.valid) {
      throw new UnauthorizedException(validation.reason || 'Token inválido');
    }

    // Reducir el contador de peticiones disponibles
    await this.tokenService.reduceReqLeft(tokenId);

    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return undefined;
    }

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}

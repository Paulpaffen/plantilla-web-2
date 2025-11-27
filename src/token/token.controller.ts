import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create-token.dto';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post()
  create(@Body() createTokenDto: CreateTokenDto) {
    return this.tokenService.create(createTokenDto);
  }

  @Get(':idToken')
  canUseToken(@Param('idToken') idToken: string) {
    return this.tokenService.canUseToken(idToken);
  }

  @Patch('reduce/:idToken')
  reduceReqLeft(@Param('idToken') idToken: string) {
    return this.tokenService.reduceReqLeft(idToken);
  }
}

import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { LocationService } from './location.service';
import { TokenAuthGuard } from '../guards/token-auth.guard';
import { CreateLocationDto } from './dto/create-location.dto';

@Controller('location')
@UseGuards(TokenAuthGuard)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Get()
  findAll() {
    return this.locationService.findAll();
  }
}

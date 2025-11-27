import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
export declare class LocationController {
    private readonly locationService;
    constructor(locationService: LocationService);
    create(createLocationDto: CreateLocationDto): Promise<import("../entities/location.entity").Location>;
    findAll(): Promise<import("../entities/location.entity").Location[]>;
}

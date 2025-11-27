import { Location } from './location.entity';
export declare class Character {
    id: number;
    name: string;
    salary: number;
    employee: boolean;
    property: Location;
    favPlaces: Location[];
}

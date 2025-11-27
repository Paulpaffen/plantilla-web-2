import { Character } from './character.entity';
export declare class Location {
    id: number;
    name: string;
    type: string;
    cost: number;
    owner: Character;
    favCharacters: Character[];
}

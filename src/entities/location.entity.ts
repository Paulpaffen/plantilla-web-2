import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany } from 'typeorm';
import { Character } from './character.entity';

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  type: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cost: number;

  @OneToOne(() => Character, (character) => character.property, { nullable: true })
  owner: Character;

  @ManyToMany(() => Character, (character) => character.favPlaces)
  favCharacters: Character[];
}

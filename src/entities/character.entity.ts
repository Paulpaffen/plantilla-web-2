import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Location } from './location.entity';

@Entity('characters')
export class Character {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  salary: number;

  @Column({ type: 'boolean', default: false })
  employee: boolean;

  @OneToOne(() => Location, (location) => location.owner, { nullable: true })
  @JoinColumn()
  property: Location;

  @ManyToMany(() => Location, (location) => location.favCharacters)
  @JoinTable({
    name: 'favorites',
    joinColumn: { name: 'characterId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'locationId', referencedColumnName: 'id' },
  })
  favPlaces: Location[];
}

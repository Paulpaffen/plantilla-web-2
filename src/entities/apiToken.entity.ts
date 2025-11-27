import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('api_tokens')
export class ApiToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  token: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'int', default: 0 })
  reqleft: number;
}

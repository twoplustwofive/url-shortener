import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PostgresEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  value: string;
}

import { IsInt, MaxLength } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column({ type: 'text' })
  @MaxLength(30, { message: 'too long' })
  firstName: string;

  @Column({ type: 'text' })
  @MaxLength(30, { message: 'too long' })
  lastName: string;

  @Column({ type: 'integer' })
  @IsInt()
  age: number;
}

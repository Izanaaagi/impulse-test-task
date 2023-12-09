import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Unique('uq_user_name', ['name'])
@Entity()
export class User {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    primaryKeyConstraintName: 'pk_user',
  })
  id: string;

  @Column()
  name: string;

  @Column()
  passwordHash: string;

  @Column()
  passwordSalt: string;

  @Column({ nullable: true })
  refreshToken?: string;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updatedAt: Date;
}

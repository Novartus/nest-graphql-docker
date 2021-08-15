import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  DeleteDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'PK Auto Increment' })
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

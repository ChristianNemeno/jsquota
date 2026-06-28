import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Quote } from '../quotes/quote.entity';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToMany(() => Quote, (quote) => quote.tags)
  quotes!: Quote[];
}

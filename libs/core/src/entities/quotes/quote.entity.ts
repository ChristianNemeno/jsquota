import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Author } from '../authors/author.entity';
import { Category } from '../categories/category.entity';
import { Tag } from '../tags/tag.entity';

@Entity('quotes')
export class Quote {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text')
  text!: string;

  @Column()
  authorId!: number;

  @Column()
  categoryId!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => Author, (author) => author.quotes)
  author!: Author;

  @ManyToOne(() => Category, (category) => category.quotes)
  category!: Category;

  @ManyToMany(() => Tag, (tag) => tag.quotes)
  @JoinTable()
  tags!: Tag[];
}

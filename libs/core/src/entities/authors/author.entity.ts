import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  OneToMany 
} from 'typeorm';


@Entity('authors')
export class Author {

    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ length: 100 })
    name!: string;
    
    @Column({ unique: true })
    email!: string;
    

    @Column({ nullable: true })
    bio!: string;
    
    @CreateDateColumn()
    createdAt!: Date;
    
    @UpdateDateColumn()
    updatedAt!:  Date;


}
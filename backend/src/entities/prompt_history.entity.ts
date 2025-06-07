import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('prompt_history')
export class PromptHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  prompt: string;

  @Column({
    nullable: true,
  })
  negativePrompt: string;

  @Column()
  RefId: string;

  @Column('text', { array: true, nullable: true })
  results: string[];

  @CreateDateColumn()
  createdAt: Date;
}

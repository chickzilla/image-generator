import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { imageStatus } from '../constant';

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
  created_at: Date;
}

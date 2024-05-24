import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Link } from 'src/link/link.entity';

@Entity({ name: 't_analytics' })
export class Analytics {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Link)
  @JoinColumn({ name: 'entity' })
  entity: Link;

  @Column({ nullable: false, default: 'na' })
  country: string;

  @Column({ nullable: false, default: 'na' })
  city: string;

  @Column({ nullable: false, default: 'na' })
  referrer: string;

  @Column({ nullable: false, default: 'na' })
  device: boolean;

  @Column({ name: 'entry_time', default: Date.now() })
  entryTime: Date;
}

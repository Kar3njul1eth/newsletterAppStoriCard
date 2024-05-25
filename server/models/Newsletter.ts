import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Newsletter {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  subject!: string;

  @Column('text')
  content!: string;

  @Column()
  callToActionLabel!: string;

  @Column()
  callToActionLink!: string;

  @Column()
  attachment!: string;
}

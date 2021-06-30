import { IdentifiableEntity } from '@circle/common/entities/identifiable.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Session extends IdentifiableEntity {
  @Column()
  username: string;

  @Column({ nullable: true })
  avatarUrl?: string;

  @Column({ nullable: true })
  email?: string;
}

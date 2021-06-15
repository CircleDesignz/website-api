import { IdentifiableEntity } from "@circle/common/entities/identifiable.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Admin extends IdentifiableEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;
}
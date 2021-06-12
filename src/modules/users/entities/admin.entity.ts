import { IdentifiableEntity } from "@circle/src/common/entities/identifiable.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Admin extends IdentifiableEntity {
  @Column()
  username: string;

  @Column()
  password: string; // TODO: Should be bytes

  @Column()
  salt: string;
}
import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export abstract class IdentifiableEntity {
  @PrimaryGeneratedColumn('increment')
  _id: number;

  @Column()
  @Generated('uuid')
  uuid: string;
}
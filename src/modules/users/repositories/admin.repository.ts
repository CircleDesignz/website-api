import { EntityRepository, Repository } from "typeorm";
import { Admin } from "../entities/admin.entity";

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {}
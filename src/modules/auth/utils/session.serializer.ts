import { Admin } from '@circle/modules/admins/entities/admin.entity';
import { AdminsService } from '@circle/modules/admins/services/admins.service';
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly _adminService: AdminsService) {
    super();
  }
  serializeUser(user: any, done: CallableFunction) {
    done(null, user.username);
  }

  async deserializeUser(username: string, done: CallableFunction) {
    return await this._adminService
      .findAdmin(username)
      .then((user) => done(null, user))
      .catch((error) => done(error));
  }
}

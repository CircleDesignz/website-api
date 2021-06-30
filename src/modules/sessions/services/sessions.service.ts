import { Injectable } from '@nestjs/common';
import { Session } from 'src/modules/sessions/entities/session.entity';
import { SessionRepository } from '../repositories/session.repository';

@Injectable()
export class SessionsService {
  constructor(private readonly _sessionRepo: SessionRepository) {}

  async findSession(sessionId: string): Promise<Session | undefined> {
    return this._sessionRepo.findOne({ id: sessionId })
  }

  async createSession(username: string): Promise<Session> {
    const session = this._sessionRepo.create({ username });
    return this._sessionRepo.save(session);
  }

  async destroySession(sessionId: string) {
    await this._sessionRepo.delete({ id: sessionId });
  }
}

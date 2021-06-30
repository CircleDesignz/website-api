import { EntityRepository, Repository } from 'typeorm';
import { Session } from '../entities/session.entity';

@EntityRepository(Session)
export class SessionRepository extends Repository<Session> {}

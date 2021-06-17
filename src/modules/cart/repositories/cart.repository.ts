import { Inject, Injectable } from '@nestjs/common';
import { RedisClient } from 'redis';
import { promisify } from 'util';
import { REDIS_TOKEN } from '../constants/di-tokens';

@Injectable()
export class CartRepository {
  private _async_hgetall: any;
  private _async_hset: any;
  private _async_del: any;

  constructor(@Inject(REDIS_TOKEN) private readonly _redisClient: RedisClient) {
    this._async_hgetall = promisify(this._redisClient.hgetall).bind(
      this._redisClient
    );
    this._async_hset = promisify(this._redisClient.hset).bind(
      this._redisClient
    );
    this._async_del = promisify(this._redisClient.del).bind(this._redisClient);
  }

  async findMany(key: string): Promise<{ [key: string]: string }> {
    return this._async_hgetall(key);
  }

  async setHash(key: string, args: string[]): Promise<boolean> {
    return this._async_hset(key, args);
  }

  async clearHash(key: string): Promise<void> {
    return this._async_del(key);
  }
}

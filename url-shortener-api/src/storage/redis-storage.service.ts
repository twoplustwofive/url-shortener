import { Injectable } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { StorageInterface } from './storage.interface';

@Injectable()
export class RedisStorageService implements StorageInterface {
  constructor(private readonly redisService: RedisService) {}

  async set(key: string, value: string): Promise<void> {
    const redisClient = this.redisService.getClient();
    await redisClient.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    const redisClient = this.redisService.getClient();
    return await redisClient.get(key);
  }
}

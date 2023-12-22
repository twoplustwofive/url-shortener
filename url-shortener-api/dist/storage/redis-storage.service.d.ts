import { RedisService } from '@liaoliaots/nestjs-redis';
import { StorageInterface } from './storage.interface';
export declare class RedisStorageService implements StorageInterface {
    private readonly redisService;
    constructor(redisService: RedisService);
    set(key: string, value: string): Promise<void>;
    get(key: string): Promise<string | null>;
}

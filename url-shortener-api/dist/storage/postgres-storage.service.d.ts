import { Repository } from 'typeorm';
import { StorageInterface } from './storage.interface';
import { PostgresEntity } from './postgres.entity';
export declare class PostgresStorageService implements StorageInterface {
    private readonly repository;
    constructor(repository: Repository<PostgresEntity>);
    set(key: string, value: string): Promise<void>;
    get(key: string): Promise<string | null>;
}

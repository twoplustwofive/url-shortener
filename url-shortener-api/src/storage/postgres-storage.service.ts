import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StorageInterface } from './storage.interface';
import { PostgresEntity } from './postgres.entity';

@Injectable()
export class PostgresStorageService implements StorageInterface {
  constructor(
    @InjectRepository(PostgresEntity)
    private readonly repository: Repository<PostgresEntity>,
  ) {}

  async set(key: string, value: string): Promise<void> {
    await this.repository.save({ key, value });
  }

  async get(key: string): Promise<string | null> {
    const result = await this.repository.findOne({ where: { key } });
    return result ? result.value : null;
  }
}

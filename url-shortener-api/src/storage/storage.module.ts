import { Module } from '@nestjs/common';
import { RedisStorageService } from './redis-storage.service';
import { RedisModule, RedisService } from '@liaoliaots/nestjs-redis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresEntity } from './postgres.entity';
import { PostgresStorageService } from './postgres-storage.service';
import { StorageInterfaceImpl } from './storage.interface';
import * as dotenv from 'dotenv';

dotenv.config();

const redisConfig = {
  imports: [
    RedisModule.forRootAsync({
      useFactory: () => ({
        config: {
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT.trim(), 10),
        },
      }),
    }),
  ],
  providers: [
    {
      provide: StorageInterfaceImpl,
      useFactory: (redisService: RedisService) => {
        return new RedisStorageService(redisService);
      },
      inject: [RedisService],
    },
  ],
  exports: [StorageInterfaceImpl],
};

const postgresConfig = {
  imports: [
    TypeOrmModule.forFeature([PostgresEntity]),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
  ],
  providers: [
    PostgresStorageService,
    {
      provide: StorageInterfaceImpl,
      useFactory: (postgresStorageService: PostgresStorageService) => {
        return postgresStorageService;
      },
      inject: [PostgresStorageService],
    },
  ],
  exports: [StorageInterfaceImpl],
};

@Module(redisConfig)
export class StorageModule {}

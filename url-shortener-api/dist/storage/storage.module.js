"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageModule = exports.StorageInterfaceImpl = void 0;
const common_1 = require("@nestjs/common");
const redis_storage_service_1 = require("./redis-storage.service");
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const typeorm_1 = require("@nestjs/typeorm");
const postgres_storage_service_1 = require("./postgres-storage.service");
const typeorm_2 = require("typeorm");
class StorageInterfaceImpl extends redis_storage_service_1.RedisStorageService {
}
exports.StorageInterfaceImpl = StorageInterfaceImpl;
const redisConfig = {
    imports: [
        nestjs_redis_1.RedisModule.forRootAsync({
            useFactory: () => ({
                config: {
                    host: process.env.REDIS_HOST,
                    port: parseInt(process.env.REDIS_PORT),
                },
            }),
        }),
    ],
    providers: [
        {
            provide: StorageInterfaceImpl,
            useFactory: (redisService) => {
                return new redis_storage_service_1.RedisStorageService(redisService);
            },
            inject: [nestjs_redis_1.RedisService],
        },
    ],
    exports: [StorageInterfaceImpl],
};
const postgresConfig = {
    imports: [
        typeorm_1.TypeOrmModule.forRootAsync({
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
        {
            provide: StorageInterfaceImpl,
            useFactory: (repositoryPostgresEntity) => {
                return new postgres_storage_service_1.PostgresStorageService(repositoryPostgresEntity);
            },
            inject: [(typeorm_2.Repository)],
        },
    ],
    exports: [StorageInterfaceImpl],
};
let StorageModule = class StorageModule {
};
StorageModule = __decorate([
    (0, common_1.Module)(redisConfig)
], StorageModule);
exports.StorageModule = StorageModule;
//# sourceMappingURL=storage.module.js.map
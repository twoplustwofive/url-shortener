"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisStorageService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
let RedisStorageService = class RedisStorageService {
    constructor(redisService) {
        this.redisService = redisService;
    }
    async set(key, value) {
        const redisClient = this.redisService.getClient();
        await redisClient.set(key, value);
    }
    async get(key) {
        const redisClient = this.redisService.getClient();
        return await redisClient.get(key);
    }
};
RedisStorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_redis_1.RedisService])
], RedisStorageService);
exports.RedisStorageService = RedisStorageService;
//# sourceMappingURL=redis-storage.service.js.map
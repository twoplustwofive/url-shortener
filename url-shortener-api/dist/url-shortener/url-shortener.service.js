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
var UrlShortenerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlShortenerService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const storage_interface_1 = require("../storage/storage.interface");
let UrlShortenerService = UrlShortenerService_1 = class UrlShortenerService {
    constructor(storage) {
        this.storage = storage;
        this.logger = new common_1.Logger(UrlShortenerService_1.name);
        this.generateUniqueShortCode = async (url) => {
            try {
                const hash = (0, crypto_1.createHash)('sha256').update(url).digest('hex');
                const baseShortHash = hash.substring(0, 8);
                let counter = -1;
                const generateShortCode = (count) => {
                    return `${baseShortHash}-${count.toString(36)}`;
                };
                while (true) {
                    counter++;
                    const shortCode = generateShortCode(counter);
                    const originalUrl = await this.findOriginalUrl(shortCode);
                    if (originalUrl !== null) {
                        this.logger.log(`Collision URL for ${shortCode}: ${originalUrl}`);
                        continue;
                    }
                    this.logger.log(`Generated unique short code: ${shortCode}`);
                    return shortCode;
                }
            }
            catch (error) {
                this.logger.error(`Error generating unique short code: ${error.message}`);
                throw error;
            }
        };
    }
    async shortenUrl(originalUrl) {
        try {
            const shortCode = await this.generateUniqueShortCode(originalUrl);
            await this.storage.set(shortCode, originalUrl);
            this.logger.log(`URL shortened: ${originalUrl} to ${shortCode}`);
            return shortCode;
        }
        catch (error) {
            this.logger.error(`Error shortening URL: ${error.message}`);
            throw error;
        }
    }
    async findOriginalUrl(shortCode) {
        try {
            const originalUrl = await this.storage.get(shortCode);
            this.logger.log(`Original URL retrieved for ${shortCode}: ${originalUrl}`);
            return originalUrl;
        }
        catch (error) {
            this.logger.error(`Error retrieving original URL: ${error.message}`);
            throw error;
        }
    }
};
UrlShortenerService = UrlShortenerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [storage_interface_1.StorageInterfaceImpl])
], UrlShortenerService);
exports.UrlShortenerService = UrlShortenerService;
//# sourceMappingURL=url-shortener.service.js.map
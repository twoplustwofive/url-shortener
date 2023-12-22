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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UrlShortenerController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlShortenerController = void 0;
const common_1 = require("@nestjs/common");
const url_shortener_service_1 = require("./url-shortener.service");
let UrlShortenerController = UrlShortenerController_1 = class UrlShortenerController {
    constructor(urlShortenerService) {
        this.urlShortenerService = urlShortenerService;
        this.logger = new common_1.Logger(UrlShortenerController_1.name);
    }
    async shortenUrl(body, res) {
        try {
            const { originalUrl } = body;
            const shortUrl = await this.urlShortenerService.shortenUrl(originalUrl);
            this.logger.log(`Original URL '${originalUrl}' shortened to '${shortUrl}'`);
            res.status(201).json({ shortUrl });
        }
        catch (error) {
            this.logger.error(`Error shortening URL: ${error.message}`);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async originalUrl(queryParam, res) {
        try {
            const { shortCode } = queryParam;
            const originalUrl = await this.urlShortenerService.findOriginalUrl(shortCode);
            this.logger.log(`Original URL for short code '${shortCode}' is '${originalUrl}'`);
            res.status(200).json({ originalUrl });
        }
        catch (error) {
            this.logger.error(`Error retrieving original URL: ${error.message}`);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async performTests(queryParam) {
        const { numberOfUrls } = queryParam;
        const startTime = Date.now();
        const urls = [];
        for (let i = 0; i < numberOfUrls; i++) {
            const randomUrl = this.generateRandomUrl(15);
            urls.push(randomUrl);
        }
        const shortCodes = [];
        for (const url of urls) {
            const shortCode = await this.urlShortenerService.shortenUrl(url);
            shortCodes.push(shortCode);
        }
        for (const shortCode of shortCodes) {
            await this.urlShortenerService.findOriginalUrl(shortCode);
        }
        const endTime = Date.now();
        const elapsedTime = endTime - startTime;
        return `Service Performance: ${elapsedTime} ms`;
    }
    generateRandomUrl(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
};
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UrlShortenerController.prototype, "shortenUrl", null);
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UrlShortenerController.prototype, "originalUrl", null);
__decorate([
    (0, common_1.Post)('/performance-test'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UrlShortenerController.prototype, "performTests", null);
UrlShortenerController = UrlShortenerController_1 = __decorate([
    (0, common_1.Controller)('url-shortener'),
    __metadata("design:paramtypes", [url_shortener_service_1.UrlShortenerService])
], UrlShortenerController);
exports.UrlShortenerController = UrlShortenerController;
//# sourceMappingURL=url-shortener.controller.js.map
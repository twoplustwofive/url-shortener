"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlShortenerModule = void 0;
const common_1 = require("@nestjs/common");
const url_shortener_controller_1 = require("./url-shortener.controller");
const url_shortener_service_1 = require("./url-shortener.service");
const storage_module_1 = require("../storage/storage.module");
let UrlShortenerModule = class UrlShortenerModule {
};
UrlShortenerModule = __decorate([
    (0, common_1.Module)({
        imports: [storage_module_1.StorageModule],
        controllers: [url_shortener_controller_1.UrlShortenerController],
        providers: [url_shortener_service_1.UrlShortenerService],
    })
], UrlShortenerModule);
exports.UrlShortenerModule = UrlShortenerModule;
//# sourceMappingURL=url-shortener.module.js.map
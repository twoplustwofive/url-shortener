import { UrlShortenerService } from './url-shortener.service';
export declare class UrlShortenerController {
    private readonly urlShortenerService;
    private readonly logger;
    constructor(urlShortenerService: UrlShortenerService);
    shortenUrl(body: {
        originalUrl: string;
    }): Promise<string>;
    originalUrl(queryParam: {
        shortCode: string;
    }): Promise<string>;
}

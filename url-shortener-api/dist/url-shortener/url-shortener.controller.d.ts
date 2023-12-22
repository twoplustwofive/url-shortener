import { Response } from 'express';
import { UrlShortenerService } from './url-shortener.service';
export declare class UrlShortenerController {
    private readonly urlShortenerService;
    private readonly logger;
    constructor(urlShortenerService: UrlShortenerService);
    shortenUrl(body: {
        originalUrl: string;
    }, res: Response): Promise<void>;
    originalUrl(queryParam: {
        shortCode: string;
    }, res: Response): Promise<void>;
    performTests(queryParam: {
        numberOfUrls: number;
    }): Promise<string>;
    private generateRandomUrl;
}

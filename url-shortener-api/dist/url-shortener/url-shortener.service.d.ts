import { StorageInterfaceImpl } from '../storage/storage.interface';
export declare class UrlShortenerService {
    private storage;
    private readonly logger;
    constructor(storage: StorageInterfaceImpl);
    shortenUrl(originalUrl: string): Promise<string>;
    findOriginalUrl(shortCode: string): Promise<string | undefined>;
    private generateUniqueShortCode;
}

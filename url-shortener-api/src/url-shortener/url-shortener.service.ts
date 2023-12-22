import { Injectable, Logger } from '@nestjs/common';
import { createHash } from 'crypto';
import { StorageInterfaceImpl } from '../storage/storage.interface';

@Injectable()
export class UrlShortenerService {
  private readonly logger = new Logger(UrlShortenerService.name);

  constructor(private storage: StorageInterfaceImpl) {}

  async shortenUrl(originalUrl: string): Promise<string> {
    try {
      const shortCode = await this.generateUniqueShortCode(originalUrl);

      await this.storage.set(shortCode, originalUrl);

      this.logger.log(`URL shortened: ${originalUrl} to ${shortCode}`);

      return shortCode;
    } catch (error) {
      this.logger.error(`Error shortening URL: ${error.message}`);
      throw error;
    }
  }

  async findOriginalUrl(shortCode: string): Promise<string | undefined> {
    try {
      const originalUrl = await this.storage.get(shortCode);

      this.logger.log(
        `Original URL retrieved for ${shortCode}: ${originalUrl}`,
      );

      return originalUrl;
    } catch (error) {
      this.logger.error(`Error retrieving original URL: ${error.message}`);
      throw error;
    }
  }

  private generateUniqueShortCode = async (url: string): Promise<string> => {
    try {
      const hash = createHash('sha256').update(url).digest('hex');

      const baseShortHash = hash.substring(0, 8);

      let counter = -1;

      const generateShortCode = (count: number): string => {
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
    } catch (error) {
      this.logger.error(`Error generating unique short code: ${error.message}`);
      throw error;
    }
  };
}

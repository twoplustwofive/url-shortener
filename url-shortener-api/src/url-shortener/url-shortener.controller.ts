import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Logger,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UrlShortenerService } from './url-shortener.service';

@Controller('url-shortener')
export class UrlShortenerController {
  private readonly logger = new Logger(UrlShortenerController.name);

  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  @Post('/')
  async shortenUrl(
    @Body() body: { originalUrl: string },
    @Res() res: Response,
  ): Promise<void> {
    try {
      const { originalUrl } = body;

      const shortUrl = await this.urlShortenerService.shortenUrl(originalUrl);

      this.logger.log(
        `Original URL '${originalUrl}' shortened to '${shortUrl}'`,
      );

      res.status(201).json({ shortUrl });
    } catch (error) {
      this.logger.error(`Error shortening URL: ${error.message}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  @Get('/')
  async originalUrl(
    @Query() queryParam: { shortCode: string },
    @Res() res: Response,
  ): Promise<void> {
    try {
      const { shortCode } = queryParam;

      const originalUrl = await this.urlShortenerService.findOriginalUrl(
        shortCode,
      );

      this.logger.log(
        `Original URL for short code '${shortCode}' is '${originalUrl}'`,
      );

      res.status(200).json({ originalUrl });
    } catch (error) {
      this.logger.error(`Error retrieving original URL: ${error.message}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  @Post('/performance-test')
  async performTests(
    @Query() queryParam: { numberOfUrls: number },
  ): Promise<string> {
    const { numberOfUrls } = queryParam;

    const startTime = Date.now();
    const urls: string[] = [];

    for (let i = 0; i < numberOfUrls; i++) {
      const randomUrl = this.generateRandomUrl(15);
      urls.push(randomUrl);
    }

    const shortCodes: string[] = [];
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

  private generateRandomUrl(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }

    return result;
  }
}

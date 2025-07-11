import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url } from '../auth/schemas/url.schema';
import { CreateUrlDto } from '../auth/dto/create-url.dto';
import { nanoid } from 'nanoid';

@Injectable()
export class ShortenerService {
  constructor(@InjectModel(Url.name) private urlModel: Model<Url>) {}

  async createShortUrl(dto: CreateUrlDto): Promise<any> {
    const { url, customCode, userId } = dto;
    const existing = await this.urlModel.findOne({ shortCode: customCode });

    if (customCode && existing) {
      throw new ConflictException('Custom code already exists');
    }

    const shortCode = customCode || nanoid(7);
    const created = new this.urlModel({
      originalUrl: url,
      shortCode,
      userId,
    });
    await created.save();

    return {
      originalUrl: created.originalUrl,
      shortUrl: `http://localhost:3000/r/${shortCode}`,
    };
  }
  

  async findAndRedirect(code: string): Promise<string | null> {
    const doc = await this.urlModel.findOneAndUpdate(
      { shortCode: code },
      { $inc: { clicks: 1 } },
      { new: true },
    );
    return doc?.originalUrl || null;
  }

  async getStats(code: string): Promise<any> {
    const data = await this.urlModel.findOne({ shortCode: code });
    if (!data) return null;
    return {
      originalUrl: data.originalUrl,
      shortUrl: `http://localhost:3000/r/${code}`,
      clicks: data.clicks,
    };
  }
}

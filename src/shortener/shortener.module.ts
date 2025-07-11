import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShortenerController } from '../shortener/shortener.controller';
import { ShortenerService } from '../shortener/shortener.service';
import { Url, UrlSchema } from '../auth/schemas/url.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }])],
  controllers: [ShortenerController],
  providers: [ShortenerService],
})
export class ShortenerModule {}

import {Controller, Post, Get, Param, Body, Res, ConflictException, NotFoundException, UseGuards,} from '@nestjs/common';
import { Response } from 'express';
import { ShortenerService } from '../shortener/shortener.service';
import { CreateUrlDto } from '../auth/dto/create-url.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Req } from '@nestjs/common';

@ApiTags('Shortener')
@Controller()
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Post('api/shorten')
async shortenUrl(@Body() body: CreateUrlDto, @Req() req) {
  console.log(req.user);
  return this.shortenerService.createShortUrl({ ...body, userId: req.user.userId });
}
@Get('r/:shortCode')
async redirectToUrl(@Param('shortCode') code: string, @Res() res: Response) {
  const originalUrl = await this.shortenerService.findAndRedirect(code);

  if (!originalUrl) {
    return res.status(404).send('Short URL not found');
  }

  return res.redirect(originalUrl);
}
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('api/stats/:shortCode')
  async getStats(@Param('shortCode') code: string) {
    const data = await this.shortenerService.getStats(code);
    if (!data) throw new NotFoundException('Stats not found');
    return data;
  }
}

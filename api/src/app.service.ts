import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from './link/link.entity';
import { AnalyticsService } from './analytics/analytics.service';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
    private analyticsService: AnalyticsService,
  ) {}

  async findLink(shortCode: string) {
    try {
      const link = await this.linkRepository.findOneBy({ shortCode });
      if (!link) {
        throw new Error('Link not found');
      }
      await this.analyticsService.create({
        entity: link,
      });
      return link;
    } catch (error) {
      throw error;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Analytics } from './analytics.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Analytics)
    private readonly analyticsRepository: Repository<Analytics>,
  ) {}

  async create(data: any) {
    try {
      const newAnalytics = this.analyticsRepository.create({
        entity: data.entity,
        country: 'na',
        // country: data.country,
        // city: data.city,
        // referrer: data.referrer,
        // device: data.device,
        // entryTime: data.entryTime,
      });

      return await this.analyticsRepository.save(newAnalytics);
    } catch (error) {
      throw error;
    }
  }

  async findAllByEntity(entityId: string) {
    try {
      if (!entityId) throw new Error('Invalid entity id');

      return await this.analyticsRepository
        .createQueryBuilder('t_analytics')
        .where('t_analytics.entity_id = :entityId', { entityId })
        .getMany();
    } catch (error) {
      throw error;
    }
  }
}

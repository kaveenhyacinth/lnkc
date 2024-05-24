import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './link.entity';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import { TeamModule } from 'src/team/team.module';
import { AnalyticsModule } from '../analytics/analytics.module';

@Module({
  imports: [TypeOrmModule.forFeature([Link]), TeamModule, AnalyticsModule],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}

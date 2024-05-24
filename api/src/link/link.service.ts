import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from './link.entity';
import { generateShortode } from 'src/utils/link.util';
import { CreateLinkDto } from './dtos/create-link.dto';
import { TeamService } from 'src/team/team.service';
import { UpdateLinkDto } from './dtos/update-link.dto';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
    private teamService: TeamService,
  ) {}

  async create(teamId: string, { url, title, description }: CreateLinkDto) {
    try {
      const shortCode = generateShortode();

      const team = await this.teamService.findById(teamId);
      if (!team) {
        throw new Error('Something went wrong when getting team');
      }

      const newLink = this.linkRepository.create({
        url,
        shortCode,
        title,
        description,
        team,
      });

      return await this.linkRepository.save(newLink);
    } catch (error) {
      throw error;
    }
  }

  async findAllByTeam(teamId: string) {
    try {
      if (!teamId) throw new Error('Invalid team id');

      const rawLinks = await this.linkRepository
        .createQueryBuilder('t_link')
        .leftJoin('t_link.analytics', 't_analytics')
        .where('t_link.team_id = :teamId', { teamId })
        .select([
          't_link.id AS id',
          't_link.title AS title',
          't_link.description AS description',
          't_link.url AS url',
          't_link.short_code AS shortCode',
          't_link.has_qr AS hasQr',
          't_link.is_custom AS isCustom',
          't_link.is_pinned AS isPinned',
          't_link.properties AS properties',
          'COUNT(t_analytics.id) AS analyticsCount',
        ])
        .groupBy('t_link.id')
        .orderBy('analyticsCount', 'DESC')
        .getRawMany();

      return rawLinks.map((rawLink) => ({
        id: rawLink.id,
        title: rawLink.title,
        description: rawLink.description,
        url: rawLink.url,
        shortCode: rawLink.shortcode,
        hasQr: rawLink.hasqr,
        isCustom: rawLink.iscustom,
        isPinned: rawLink.ispinned,
        properties: rawLink.properties,
        analyticsCount: parseInt(rawLink.analyticscount, 10), // Convert string to number
      }));
    } catch (error) {
      throw error;
    }
  }

  async findOneById(linkId: string, teamId: string) {
    try {
      if (!linkId) {
        throw new Error('Link id is null');
      }
      const link = await this.linkRepository
        .createQueryBuilder('t_link')
        .where('t_link.id = :linkId', { linkId })
        .andWhere('t_link.team_id = :teamId', { teamId })
        .getOne();
      if (!link) {
        throw new Error('Cannot find the link');
      }
      return link;
    } catch (error) {
      throw error;
    }
  }

  async updateOneById({
    teamId,
    linkId,
    body,
  }: {
    teamId: string;
    linkId: string;
    body: UpdateLinkDto;
  }) {
    try {
      if (!teamId || !linkId) throw new Error('Invalid identifier');
      const link = await this.linkRepository
        .createQueryBuilder('t_link')
        .update(Link, body)
        .where('t_link.id = :linkId', { linkId })
        .andWhere('t_link.team_id = :teamId', { teamId })
        .returning('*')
        .execute();

      const plainResult = link.raw[0];
      const linkInstance = this.linkRepository.create({
        ...plainResult,
        shortCode: plainResult.short_code,
        hasQr: plainResult.has_qr,
        isCustom: plainResult.is_custom,
        isPinned: plainResult.is_pinned,
      });

      return linkInstance;
    } catch (error) {
      throw error;
    }
  }

  async deleteOneById(teamId: string, linkId: string) {
    try {
      if (!linkId) throw new Error('Invalid identifier - link');

      const { affected } = await this.linkRepository
        .createQueryBuilder('t_link')
        .delete()
        .from(Link)
        .where('t_link.id = :linkId', { linkId })
        .andWhere('t_link.team_id = :teamId', { teamId })
        .execute();

      if (!affected) throw new Error('Invalid identifier - team');
    } catch (error) {
      throw error;
    }
  }

  find() {
    return this.linkRepository.find();
  }

  findOne(shortCode: string) {
    return this.linkRepository.findOneBy({ shortCode });
  }
}

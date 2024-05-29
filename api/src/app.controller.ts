import { Controller, Get, Param, Redirect, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'node:path';
import { LinkDto } from 'src/link/dtos/link.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AppService } from './app.service';

@Controller()
@Serialize(LinkDto)
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  async homepage(@Res() res: Response) {
    return res.sendFile(join(`${process.cwd()}/src/static/homepage.html`));
  }

  @Get(':shortCode')
  @Redirect('', 302)
  async findOne(@Param('shortCode') shortCode: string): Promise<LinkDto> {
    return await this.appService.findLink(shortCode);
  }
}

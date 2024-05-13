import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dtos/create-role.dto';

@Controller('api/roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post('/new')
  async createRole(@Body() body: CreateRoleDto) {
    const role = await this.roleService.create(body);
    return role;
  }

  @Get(':name')
  async getRoleByName(@Param('name') name: string) {
    const role = await this.roleService.findByRoleName(name);
    return role;
  }
}

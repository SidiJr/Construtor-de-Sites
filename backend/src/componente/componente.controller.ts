import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComponenteService } from './componente.service';
import { CreateComponenteDto } from './dto/create-componente.dto';
import { UpdateComponenteDto } from './dto/update-componente.dto';

@Controller('componente')
export class ComponenteController {
  constructor(private readonly componenteService: ComponenteService) {}

  @Post()
  async create(@Body() createComponenteDto: CreateComponenteDto) {
    return await this.componenteService.create(createComponenteDto);
  }

  @Get()
  async findAll() {
    return await this.componenteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.componenteService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateComponenteDto: UpdateComponenteDto,
  ) {
    return await this.componenteService.update(+id, updateComponenteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.componenteService.remove(+id);
  }
}

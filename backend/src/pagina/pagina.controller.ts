import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaginaService } from './pagina.service';
import { CreatePaginaDto } from './dto/create-pagina.dto';
import { UpdatePaginaDto } from './dto/update-pagina.dto';

@Controller('pagina')
export class PaginaController {
  constructor(private readonly paginaService: PaginaService) {}

  @Post()
  create(@Body() createPaginaDto: CreatePaginaDto) {
    return this.paginaService.create(createPaginaDto);
  }

  @Get()
  findAll() {
    return this.paginaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paginaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaginaDto: UpdatePaginaDto) {
    return this.paginaService.update(+id, updatePaginaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paginaService.remove(+id);
  }
}

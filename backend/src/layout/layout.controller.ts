import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { LayoutService } from './layout.service';
import { CreateLayoutDto } from './dto/create-layout.dto';
import { UpdateLayoutDto } from './dto/update-layout.dto';

@Controller('layout')
export class LayoutController {
  constructor(private readonly layoutService: LayoutService) {}

  @Post()
  create(@Body() dto: CreateLayoutDto) {
    return this.layoutService.create(dto);
  }

  @Get()
  findAll() {
    return this.layoutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.layoutService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateLayoutDto) {
    return this.layoutService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.layoutService.remove(id);
  }
}

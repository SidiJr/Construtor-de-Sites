import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  criar(@Body() body: { nome: string; email: string; senha: string }) {
    return this.usuariosService.criar(body.nome, body.email, body.senha);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  listar() {
    return this.usuariosService.listar();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.usuariosService.buscarPorId(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deletar(@Param('id') id: string) {
    return this.usuariosService.deletar(Number(id));
  }
}

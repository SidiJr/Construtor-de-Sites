import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { AtualizarUsuarioDto } from './dto/atualizar-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  @Post()
  criar(@Body() criarUsuarioDto: CriarUsuarioDto) {
    const { nome, email, senha } = criarUsuarioDto;
    return this.usuariosService.criar(nome, email, senha);
  }

  @Get()
  listar() {
    return this.usuariosService.listar();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.usuariosService.buscarPorId(Number(id));
  }

  @Patch(':id')
  atualizar(
    @Param('id') id: string,
    @Body() atualizarUsuarioDto: AtualizarUsuarioDto,
  ) {
    return this.usuariosService.atualizar(Number(id), atualizarUsuarioDto);
  }

  @Delete(':id')
  deletar(@Param('id') id: string) {
    return this.usuariosService.deletar(Number(id));
  }
}

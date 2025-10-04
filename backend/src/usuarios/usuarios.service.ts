import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Usuario } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async criar(nome: string, email: string, senha: string): Promise<Usuario> {
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    return this.prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaCriptografada,
      },
    });
  }

  async listar(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany();
  }

  async buscarPorId(id: number): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: { id },
    });
  }

  async atualizar(
    id: number,
    dados: Partial<{ nome: string; email: string; senha: string }>,
  ): Promise<Usuario> {
    if (dados.senha) {
      dados.senha = await bcrypt.hash(dados.senha, 10);
    }
    return this.prisma.usuario.update({
      where: { id },
      data: dados,
    });
  }

  async deletar(id: number): Promise<Usuario> {
    return this.prisma.usuario.delete({ where: { id } });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async criar(nome: string, email: string, senha: string) {
    // Verificar se já existe usuário com esse email
    const usuarioExistente = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (usuarioExistente) {
      return {
        data: null,
        status: 'erro',
        statusCode: 400,
        message: 'Email já cadastrado',
      };
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = await this.prisma.usuario.create({
      data: { nome, email, senha: senhaCriptografada },
    });

    // Remover a senha do objeto retornado
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha: _, ...usuarioSemSenha } = usuario;

    return {
      data: usuarioSemSenha,
      status: 'sucesso',
      statusCode: 201,
      message: 'Usuário criado com sucesso',
    };
  }

  async listar() {
    const usuarios = await this.prisma.usuario.findMany({
      select: { id: true, nome: true, email: true },
    });

    return {
      data: usuarios,
      status: 'sucesso',
      statusCode: 200,
      message: 'Usuários retornados com sucesso',
    };
  }

  async buscarPorId(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
      select: { id: true, nome: true, email: true },
    });

    if (!usuario) {
      return {
        data: null,
        status: 'erro',
        statusCode: 404,
        message: 'Usuário não encontrado',
      };
    }

    return {
      data: usuario,
      status: 'sucesso',
      statusCode: 200,
      message: 'Usuário encontrado',
    };
  }

  async deletar(id: number) {
    const usuario = await this.prisma.usuario.findUnique({ where: { id } });
    if (!usuario) {
      return {
        data: null,
        status: 'erro',
        statusCode: 404,
        message: 'Usuário não encontrado',
      };
    }

    await this.prisma.usuario.delete({ where: { id } });

    return {
      data: null,
      status: 'sucesso',
      statusCode: 200,
      message: 'Usuário deletado com sucesso',
    };
  }
}

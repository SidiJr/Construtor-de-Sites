// auth.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, senha: string) {
    const usuario = await this.prisma.usuario.findUnique({ where: { email } });
    if (!usuario) {
      return {
        data: null,
        status: 'erro',
        statusCode: 404,
        message: 'Usuário ou senha incorretos',
      };
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return {
        data: null,
        status: 'erro',
        statusCode: 400,
        message: 'Usuário ou senha incorretos',
      };
    }

    const payload = { id: usuario.id, email: usuario.email };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha: _, ...usuarioSemSenha } = usuario;

    return {
      data: { usuario: usuarioSemSenha, token },
      status: 'sucesso',
      statusCode: 200,
      message: 'Login realizado com sucesso',
    };
  }
}

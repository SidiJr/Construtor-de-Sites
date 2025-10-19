import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateComponenteDto } from './dto/create-componente.dto';
import { UpdateComponenteDto } from './dto/update-componente.dto';

@Injectable()
export class ComponenteService {
  constructor(private prisma: PrismaService) {}

  async create(createComponenteDto: CreateComponenteDto) {
    const componente = await this.prisma.componente.create({
      data: createComponenteDto,
    });

    return {
      data: componente,
      status: 'success',
      statusCode: 201,
      message: 'Componente criado com sucesso!',
    };
  }

  async findAll() {
    const componentes = await this.prisma.componente.findMany();

    return {
      data: componentes,
      status: 'success',
      statusCode: 200,
      message: 'Componentes listados com sucesso!',
    };
  }

  async findOne(id: number) {
    const componente = await this.prisma.componente.findUnique({
      where: { id },
    });

    if (!componente) {
      throw new NotFoundException('Componente não encontrado.');
    }

    return {
      data: componente,
      status: 'success',
      statusCode: 200,
      message: 'Componente encontrado com sucesso!',
    };
  }

  async update(id: number, updateComponenteDto: UpdateComponenteDto) {
    const componenteExistente = await this.prisma.componente.findUnique({
      where: { id },
    });

    if (!componenteExistente) {
      throw new NotFoundException('Componente não encontrado.');
    }

    const componenteAtualizado = await this.prisma.componente.update({
      where: { id },
      data: updateComponenteDto,
    });

    return {
      data: componenteAtualizado,
      status: 'success',
      statusCode: 200,
      message: 'Componente atualizado com sucesso!',
    };
  }

  async remove(id: number) {
    const componenteExistente = await this.prisma.componente.findUnique({
      where: { id },
    });

    if (!componenteExistente) {
      throw new NotFoundException('Componente não encontrado.');
    }

    await this.prisma.componente.delete({
      where: { id },
    });

    return {
      data: null,
      status: 'success',
      statusCode: 200,
      message: 'Componente deletado com sucesso!',
    };
  }
}

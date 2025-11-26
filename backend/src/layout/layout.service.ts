import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLayoutDto } from './dto/create-layout.dto';
import { UpdateLayoutDto } from './dto/update-layout.dto';

@Injectable()
export class LayoutService {
  constructor(private prisma: PrismaService) {}

  async create(createLayoutDto: CreateLayoutDto) {
    const { componentesIds, ...rest } = createLayoutDto;

    const layout = await this.prisma.layout.create({
      data: {
        ...rest,
        componentes: componentesIds?.length
          ? {
              connect: componentesIds.map((id) => ({ id })),
            }
          : undefined,
      },
    });

    const full = await this.prisma.layout.findUnique({
      where: { id: layout.id },
      include: {
        componentes: true,
        paginas: true,
      },
    });

    return {
      data: full,
      status: 'success',
      statusCode: 201,
      message: 'Layout criado com sucesso!',
    };
  }

  async findAll() {
    const layouts = await this.prisma.layout.findMany({
      orderBy: { id: 'desc' },
      include: {
        componentes: true,
        paginas: true,
      },
    });

    return {
      data: layouts,
      status: 'success',
      statusCode: 200,
      message: 'Layouts listados com sucesso!',
    };
  }

  async findOne(id: number) {
    const layout = await this.prisma.layout.findUnique({
      where: { id },
      include: {
        componentes: true,
        paginas: true,
      },
    });

    if (!layout) {
      throw new NotFoundException('Layout não encontrado.');
    }

    return {
      data: layout,
      status: 'success',
      statusCode: 200,
      message: 'Layout encontrado com sucesso!',
    };
  }

  async update(id: number, updateLayoutDto: UpdateLayoutDto) {
    const { componentesIds, ...rest } = updateLayoutDto;

    const layoutExistente = await this.prisma.layout.findUnique({
      where: { id },
    });
    if (!layoutExistente) {
      throw new NotFoundException('Layout não encontrado.');
    }

    await this.prisma.layout.update({
      where: { id },
      data: {
        ...rest,
        componentes: componentesIds
          ? {
              set: [],
              connect: componentesIds.map((cid) => ({ id: cid })),
            }
          : undefined,
      },
    });

    const full = await this.prisma.layout.findUnique({
      where: { id },
      include: {
        componentes: true,
        paginas: true,
      },
    });

    return {
      data: full,
      status: 'success',
      statusCode: 200,
      message: 'Layout atualizado com sucesso!',
    };
  }

  async remove(id: number) {
    const layoutExistente = await this.prisma.layout.findUnique({
      where: { id },
    });
    if (!layoutExistente) {
      throw new NotFoundException('Layout não encontrado.');
    }

    await this.prisma.layout.delete({
      where: { id },
    });

    return {
      data: null,
      status: 'success',
      statusCode: 200,
      message: 'Layout deletado com sucesso!',
    };
  }
}

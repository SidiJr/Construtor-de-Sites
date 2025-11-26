import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaginaDto } from './dto/create-pagina.dto';
import { UpdatePaginaDto } from './dto/update-pagina.dto';

@Injectable()
export class PaginaService {
  constructor(private prisma: PrismaService) {}

  async create(createPaginaDto: CreatePaginaDto) {
    const { siteId, layoutId, componentes, ...rest } = createPaginaDto;

    const pagina = await this.prisma.pagina.create({
      data: {
        ...rest,
        ...(siteId ? { site: { connect: { id: siteId } } } : {}),
        ...(layoutId ? { layout: { connect: { id: layoutId } } } : {}),
      },
    });

    // inserir componentes na página
    if (componentes?.length) {
      await this.prisma.paginaComponente.createMany({
        data: componentes.map((c) => ({
          paginaId: pagina.id,
          componenteId: c.componenteId,
          ordem: c.ordem,
        })),
      });
    }

    const paginaComRelacionamentos = await this.prisma.pagina.findUnique({
      where: { id: pagina.id },
      include: {
        site: true,
        layout: true,
        componentesComPagina: {
          include: { componente: true },
          orderBy: { ordem: 'asc' },
        },
      },
    });

    return {
      data: paginaComRelacionamentos,
      status: 'success',
      statusCode: 201,
      message: 'Página criada com sucesso!',
    };
  }

  async findAll() {
    const paginas = await this.prisma.pagina.findMany({
      orderBy: { id: 'desc' },
      include: {
        site: true,
        layout: true,
        componentesComPagina: {
          include: { componente: true },
          orderBy: { ordem: 'asc' },
        },
      },
    });

    return {
      data: paginas,
      status: 'success',
      statusCode: 200,
      message: 'Páginas listadas com sucesso!',
    };
  }

  async findOne(id: number) {
    const pagina = await this.prisma.pagina.findUnique({
      where: { id },
      include: {
        site: true,
        layout: true,
        componentesComPagina: {
          include: { componente: true },
          orderBy: { ordem: 'asc' },
        },
      },
    });

    if (!pagina) throw new NotFoundException('Página não encontrada.');

    return {
      data: pagina,
      status: 'success',
      statusCode: 200,
      message: 'Página encontrada com sucesso!',
    };
  }

  async update(id: number, updatePaginaDto: UpdatePaginaDto) {
    const { siteId, layoutId, componentes, ...rest } = updatePaginaDto;

    const paginaExistente = await this.prisma.pagina.findUnique({
      where: { id },
    });
    if (!paginaExistente) throw new NotFoundException('Página não encontrada.');

    await this.prisma.pagina.update({
      where: { id },
      data: {
        ...rest,
        ...(siteId ? { site: { connect: { id: siteId } } } : {}),
        ...(layoutId ? { layout: { connect: { id: layoutId } } } : {}),
      },
    });

    if (componentes) {
      await this.prisma.paginaComponente.deleteMany({
        where: { paginaId: id },
      });

      await this.prisma.paginaComponente.createMany({
        data: componentes.map((c) => ({
          paginaId: id,
          componenteId: c.componenteId,
          ordem: c.ordem,
        })),
      });
    }

    const full = await this.prisma.pagina.findUnique({
      where: { id },
      include: {
        site: true,
        layout: true,
        componentesComPagina: {
          include: { componente: true },
          orderBy: { ordem: 'asc' },
        },
      },
    });

    return {
      data: full,
      status: 'success',
      statusCode: 200,
      message: 'Página atualizada com sucesso!',
    };
  }

  async remove(id: number) {
    const paginaExistente = await this.prisma.pagina.findUnique({
      where: { id },
    });
    if (!paginaExistente) throw new NotFoundException('Página não encontrada.');

    await this.prisma.pagina.delete({ where: { id } });

    return {
      data: null,
      status: 'success',
      statusCode: 200,
      message: 'Página deletada com sucesso!',
    };
  }
}

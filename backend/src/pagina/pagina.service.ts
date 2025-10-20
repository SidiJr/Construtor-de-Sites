import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaginaDto } from './dto/create-pagina.dto';
import { UpdatePaginaDto } from './dto/update-pagina.dto';

@Injectable()
export class PaginaService {
  constructor(private prisma: PrismaService) {}

  async create(createPaginaDto: CreatePaginaDto) {
    const { siteId, componentesIds, ...rest } = createPaginaDto;

    const pagina = await this.prisma.pagina.create({
      data: {
        ...rest,
        site: { connect: { id: siteId } },
        componentes: componentesIds
          ? { connect: componentesIds.map((id) => ({ id })) }
          : undefined,
      },
      include: { componentes: true, site: true },
    });

    return {
      data: pagina,
      status: 'success',
      statusCode: 201,
      message: 'Página criada com sucesso!',
    };
  }

  async findAll() {
    const paginas = await this.prisma.pagina.findMany({
      include: { componentes: true, site: true },
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
      include: { componentes: true, site: true },
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
    const { siteId, componentesIds, ...rest } = updatePaginaDto;

    const paginaExistente = await this.prisma.pagina.findUnique({
      where: { id },
    });
    if (!paginaExistente) throw new NotFoundException('Página não encontrada.');

    const paginaAtualizada = await this.prisma.pagina.update({
      where: { id },
      data: {
        ...rest,
        site: siteId ? { connect: { id: siteId } } : undefined,
        componentes: componentesIds
          ? { set: componentesIds.map((id) => ({ id })) }
          : undefined,
      },
      include: { componentes: true, site: true },
    });

    return {
      data: paginaAtualizada,
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

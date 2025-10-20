import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SiteService {
  constructor(private prisma: PrismaService) {}

  async create(createSiteDto: CreateSiteDto) {
    const { usuarioId, ...rest } = createSiteDto;

    const site = await this.prisma.site.create({
      data: {
        ...rest,
        usuario: { connect: { id: usuarioId } },
      },
    });

    return {
      data: site,
      status: 'success',
      statusCode: 201,
      message: 'Site criado com sucesso!',
    };
  }

  async findAll() {
    const sites = await this.prisma.site.findMany();

    return {
      data: sites,
      status: 'success',
      statusCode: 200,
      message: 'Sites listados com sucesso!',
    };
  }

  async findOne(id: number) {
    const site = await this.prisma.site.findUnique({
      where: { id },
    });

    if (!site) {
      throw new NotFoundException('Site não encontrado.');
    }

    return {
      data: site,
      status: 'success',
      statusCode: 200,
      message: 'Site encontrado com sucesso!',
    };
  }

  async update(id: number, updateSiteDto: UpdateSiteDto) {
    const siteExistente = await this.prisma.site.findUnique({
      where: { id },
    });

    if (!siteExistente) {
      throw new NotFoundException('Site não encontrado.');
    }

    const siteAtualizado = await this.prisma.site.update({
      where: { id },
      data: updateSiteDto,
    });

    return {
      data: siteAtualizado,
      status: 'success',
      statusCode: 200,
      message: 'Site atualizado com sucesso!',
    };
  }

  async remove(id: number) {
    const siteExistente = await this.prisma.site.findUnique({
      where: { id },
    });

    if (!siteExistente) {
      throw new NotFoundException('Site não encontrado.');
    }

    await this.prisma.site.delete({
      where: { id },
    });

    return {
      data: null,
      status: 'success',
      statusCode: 200,
      message: 'Site deletado com sucesso!',
    };
  }
}

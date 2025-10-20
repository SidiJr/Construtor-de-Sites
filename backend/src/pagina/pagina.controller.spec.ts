import { Test, TestingModule } from '@nestjs/testing';
import { PaginaController } from './pagina.controller';
import { PaginaService } from './pagina.service';

describe('PaginaController', () => {
  let controller: PaginaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaginaController],
      providers: [PaginaService],
    }).compile();

    controller = module.get<PaginaController>(PaginaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

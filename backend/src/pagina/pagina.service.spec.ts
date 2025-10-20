import { Test, TestingModule } from '@nestjs/testing';
import { PaginaService } from './pagina.service';

describe('PaginaService', () => {
  let service: PaginaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaginaService],
    }).compile();

    service = module.get<PaginaService>(PaginaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

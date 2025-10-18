import { Test, TestingModule } from '@nestjs/testing';
import { ComponenteController } from './componente.controller';
import { ComponenteService } from './componente.service';

describe('ComponenteController', () => {
  let controller: ComponenteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponenteController],
      providers: [ComponenteService],
    }).compile();

    controller = module.get<ComponenteController>(ComponenteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

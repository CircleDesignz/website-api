import { Test, TestingModule } from '@nestjs/testing';
import { StockroomController } from './stockroom.controller';

describe('StockroomController', () => {
  let controller: StockroomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockroomController],
    }).compile();

    controller = module.get<StockroomController>(StockroomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { StockroomService } from './stockroom.service';

describe('StockroomService', () => {
  let service: StockroomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockroomService],
    }).compile();

    service = module.get<StockroomService>(StockroomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

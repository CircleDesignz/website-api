import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { InventoryService } from './inventory.service';
import { OrdersModule } from '../orders/orders.module';
import { InventoryUnit } from './inventory-unit.entity';
import { Order } from '../orders/order.entity';
import { Customer } from '../customers/customer.entity';
import { RegisterUnitDto} from './dto/register-unit.dto';
import { OrdersService } from '../orders/orders.service';

describe('InventoryService', () => {
  let inventoryService: InventoryService;
  let ordersService: OrdersService;
  let testRepository: Repository<InventoryUnit>;
  let module: TestingModule;

  // TODO: Move this shit to a utils library
  beforeEach(async () => {
    module = await Test.createTestingModule({
      // TODO: This should be moved into .env file
      imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: '0.0.0.0',
        port: 5001,
        username: 'user',
        password: 'password',
        database: 'test_data',
        entities: [InventoryUnit, Order, Customer],
        synchronize: true,
        }),
        TypeOrmModule.forFeature([InventoryUnit, Order, Customer]),
        OrdersModule,
      ],
      providers: [InventoryService, OrdersService],
    }).compile();

    inventoryService = module.get(InventoryService);
    ordersService = module.get(OrdersService);
    testRepository = module.get(getRepositoryToken(InventoryUnit));
  })

  afterAll(async () => {
    testRepository.clear() // TODO: fix this
    module.close();
  });

  it('should register new unit', async () => {
    let dto = new RegisterUnitDto();
    dto.sku = '123';
    dto.name = 'TestProduct';
    dto.costInCad = 123;
    dto.priceInCad = 123;
    dto.stock = 0;
    dto.weightInKg = 123;
    await inventoryService.registerUnit(dto);
    expect((await testRepository.find()).length === 1);

  })
})
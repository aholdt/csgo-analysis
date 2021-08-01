import { Test, TestingModule } from '@nestjs/testing';
import { DemoparserService } from './demoparser.service';

describe('DemoparserService', () => {
  let service: DemoparserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DemoparserService],
    }).compile();

    service = module.get<DemoparserService>(DemoparserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

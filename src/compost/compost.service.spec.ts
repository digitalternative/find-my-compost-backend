import { Test, TestingModule } from '@nestjs/testing';
import { CompostService } from './compost.service';

describe('CompostService', () => {
  let service: CompostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompostService],
    }).compile();

    service = module.get<CompostService>(CompostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

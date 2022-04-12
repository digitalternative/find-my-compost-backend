import { Test, TestingModule } from '@nestjs/testing';
import { CompostsService } from './composts.service';

describe('CompostsService', () => {
  let service: CompostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompostsService],
    }).compile();

    service = module.get<CompostsService>(CompostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

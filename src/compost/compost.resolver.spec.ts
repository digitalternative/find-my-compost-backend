import { Test, TestingModule } from '@nestjs/testing';
import { CompostResolver } from './compost.resolver';
import { CompostService } from './compost.service';

describe('CompostResolver', () => {
  let resolver: CompostResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompostResolver, CompostService],
    }).compile();

    resolver = module.get<CompostResolver>(CompostResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

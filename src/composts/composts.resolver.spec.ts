import { Test, TestingModule } from '@nestjs/testing';
import { CompostsResolver } from './composts.resolver';
import { CompostsService } from './composts.service';

describe('CompostsResolver', () => {
  let resolver: CompostsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompostsResolver, CompostsService],
    }).compile();

    resolver = module.get<CompostsResolver>(CompostsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

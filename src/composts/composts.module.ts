import { Module } from '@nestjs/common';
import { CompostsService } from './composts.service';
import { CompostsResolver } from './composts.resolver';

@Module({
  providers: [CompostsResolver, CompostsService]
})
export class CompostsModule {}

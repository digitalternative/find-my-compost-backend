import { Module } from '@nestjs/common';
import { CompostService } from './compost.service';
import { CompostResolver } from './compost.resolver';
import { CompostSchema } from './schemas/compost.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Compost', schema: CompostSchema }]),
  ],
  providers: [CompostResolver, CompostService],
})
export class CompostModule {}

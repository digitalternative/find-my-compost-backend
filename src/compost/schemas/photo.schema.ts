import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompostDocument = Photo & Document;

@Schema()
export class Photo {
  @Prop()
  filename: string;

  @Prop()
  file: string;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Timetable } from './timetable.schema';
import { Address } from './address.schema';
import { Photo } from './photo.schema';
import { Type } from '../enums/type.enum';
import { User } from 'src/user/schemas/user.schemas';

export type CompostDocument = Compost & Document;

@Schema()
export class Compost {
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  manager: string;

  @Prop()
  email: string;

  @Prop()
  address: Address;

  @Prop()
  photo: Photo;

  @Prop()
  phone: string;

  @Prop()
  website: string;

  @Prop()
  type: Type;

  @Prop()
  timetable: Array<Timetable>;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
  })
  user: MongooseSchema.Types.ObjectId;
}

export const CompostSchema = SchemaFactory.createForClass(Compost);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CompostDocument = Address & Document;

export class Coordinates {
  @Prop()
  lat: Types.Decimal128;
  @Prop()
  lng: Types.Decimal128;
}

@Schema()
export class Address {
  @Prop()
  street: string;

  @Prop()
  city: string;

  @Prop()
  zipcode: number;

  @Prop()
  coordinates: Coordinates;
}

export const AddressSchema = SchemaFactory.createForClass(Address);

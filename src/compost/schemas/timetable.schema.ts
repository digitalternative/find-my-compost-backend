import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompostDocument = Timetable & Document;

export class Time {
  @Prop()
  hours: number;
  @Prop()
  minutes: number;
  @Prop()
  seconds: number;
}

@Schema()
export class Timetable {
  @Prop()
  day: number;

  @Prop()
  start: Time;

  @Prop()
  end: Time;
}

export const TimetableSchema = SchemaFactory.createForClass(Timetable);

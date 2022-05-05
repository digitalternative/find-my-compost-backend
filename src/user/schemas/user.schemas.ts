import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Role } from '../enums/role.enum';

@Schema()
export class User extends Document {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  roles: Role[];

  @Prop()
  favorites: string[];

  @Prop()
  googleId: string;

  @Prop()
  facebookId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

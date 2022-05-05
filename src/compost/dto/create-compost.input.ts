import { Address } from '../schemas/address.schema';
import { Photo } from '../schemas/photo.schema';
import { Schema as MongooseSchema } from 'mongoose';
export class CreateCompostInput {
  title: string;
  manager: string;
  email: string;
  phone: string;
  website: string;
  type: string;
  address: Address;
  photo: Photo;
  user: MongooseSchema.Types.ObjectId;
}

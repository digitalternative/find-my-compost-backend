import { Address } from '../schemas/address.schema';
import { Schema as MongooseSchema } from 'mongoose';
export declare class CreateCompostInput {
    title: string;
    manager: string;
    email: string;
    phone: string;
    website: string;
    type: string;
    address: Address;
    user: MongooseSchema.Types.ObjectId;
}

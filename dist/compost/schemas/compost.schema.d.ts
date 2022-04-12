import { Document, Schema as MongooseSchema } from 'mongoose';
import { Address } from './address.schema';
import { Type } from '../enums/type.enum';
export declare type CompostDocument = Compost & Document;
export declare class Compost {
    _id: MongooseSchema.Types.ObjectId;
    title: string;
    manager: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    type: Type;
    user: MongooseSchema.Types.ObjectId;
}
export declare const CompostSchema: MongooseSchema<Document<Compost, any, any>, import("mongoose").Model<Document<Compost, any, any>, any, any, any>, any, any>;

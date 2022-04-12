import { Document, Types } from 'mongoose';
export declare type CompostDocument = Address & Document;
export declare class Coordinates {
    lat: Types.Decimal128;
    lng: Types.Decimal128;
}
export declare class Address {
    street: string;
    city: string;
    zipcode: number;
    coordinates: Coordinates;
}
export declare const AddressSchema: import("mongoose").Schema<Document<Address, any, any>, import("mongoose").Model<Document<Address, any, any>, any, any, any>, any, any>;

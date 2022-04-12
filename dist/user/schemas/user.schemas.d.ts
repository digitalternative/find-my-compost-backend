import { Document, Schema as MongooseSchema } from 'mongoose';
import { Role } from '../enums/role.enum';
export declare class User extends Document {
    _id: MongooseSchema.Types.ObjectId;
    username: string;
    password: string;
    email: string;
    roles: Role[];
    favorites: string[];
    googleId: string;
    facebookId: string;
}
export declare const UserSchema: MongooseSchema<User, import("mongoose").Model<User, any, any, any>, any, any>;

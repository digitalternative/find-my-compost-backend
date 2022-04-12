import { ClientSession, Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './schemas/user.schemas';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    create(createUserInput: CreateUserInput, session: ClientSession): Promise<User & {
        _id: import("mongoose").Schema.Types.ObjectId;
    }>;
    findAll(): Promise<(User & {
        _id: import("mongoose").Schema.Types.ObjectId;
    })[]>;
    findOne(email: string): Promise<User>;
    findByGoogleId(googleId: string): Promise<User>;
    findByFacebookId(facebookId: string): Promise<User>;
    remove(email: string): Promise<User & {
        _id: import("mongoose").Schema.Types.ObjectId;
    }>;
    update(updateUserInput: UpdateUserInput): Promise<User>;
}

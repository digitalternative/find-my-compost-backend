import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { ClientSession } from 'mongoose';
import { UpdateUserInput } from './dto/update-user.input';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserInput: CreateUserInput, session: ClientSession): Promise<import("./schemas/user.schemas").User & {
        _id: import("mongoose").Schema.Types.ObjectId;
    }>;
    findAll(): Promise<(import("./schemas/user.schemas").User & {
        _id: import("mongoose").Schema.Types.ObjectId;
    })[]>;
    findOne(email: string): Promise<import("./schemas/user.schemas").User>;
    remove(email: string): Promise<import("./schemas/user.schemas").User & {
        _id: import("mongoose").Schema.Types.ObjectId;
    }>;
    update(updateUserInput: UpdateUserInput): Promise<any>;
}

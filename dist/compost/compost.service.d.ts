import { Compost } from './schemas/compost.schema';
import { ClientSession, Model } from 'mongoose';
import { CreateCompostInput } from './dto/create-compost.input';
import { UpdateCompostInput } from './dto/update-compost.input';
export declare class CompostService {
    private readonly CompostModel;
    constructor(CompostModel: Model<Compost>);
    create(CreateCompostInput: CreateCompostInput, session: ClientSession): Promise<import("mongoose").Document<unknown, any, Compost> & Compost & {
        _id: import("mongoose").Schema.Types.ObjectId;
    }>;
    findAll(): Promise<Compost[]>;
    findMine(userId: string): Promise<Compost[]>;
    findOne(_id: string): Promise<Compost>;
    update(updateCompostInput: UpdateCompostInput, session: ClientSession): Promise<Compost>;
    remove(_id: string): Promise<Compost>;
}

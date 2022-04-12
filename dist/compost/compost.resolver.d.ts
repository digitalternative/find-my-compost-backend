import { CreateCompostInput } from './dto/create-compost.input';
import { CompostService } from './compost.service';
import { UpdateCompostInput } from './dto/update-compost.input';
import { Connection } from 'mongoose';
export declare class CompostResolver {
    private readonly mongoConnection;
    private readonly compostsService;
    constructor(mongoConnection: Connection, compostsService: CompostService);
    findAll(): Promise<import("./schemas/compost.schema").Compost[]>;
    findMine(req: any): Promise<import("./schemas/compost.schema").Compost[]>;
    findOne(_id: string): Promise<import("./schemas/compost.schema").Compost>;
    createAll(createCompostInputs: CreateCompostInput[]): Promise<any[]>;
    update(updateCompostInput: UpdateCompostInput): Promise<any>;
    remove(_id: string): Promise<import("./schemas/compost.schema").Compost>;
}

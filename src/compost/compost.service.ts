import { Compost } from './schemas/compost.schema';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { CreateCompostInput } from './dto/create-compost.input';
import { UpdateCompostInput } from './dto/update-compost.input';

@Injectable()
export class CompostService {
  constructor(
    @InjectModel('Compost') private readonly CompostModel: Model<Compost>,
  ) { }

  async create(CreateCompostInput: CreateCompostInput, session: ClientSession) {
    let newCompost = new this.CompostModel(CreateCompostInput);
    try {
      newCompost = await newCompost.save({ session });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return await newCompost;
  }

  async findAll(): Promise<Compost[]> {
    return this.CompostModel.find().populate('user', 'username email').exec();
  }

  async findMine(userId: string): Promise<Compost[]> {
    return this.CompostModel.find({ user: userId })
      .populate('user', 'username email')
      .exec();
  }

  async findOne(_id: string): Promise<Compost> {
    return this.CompostModel.findById(_id).exec();
  }

  async update(
    updateCompostInput: UpdateCompostInput,
    session: ClientSession,
  ): Promise<Compost> {
    let updateCompost;
    try {
      updateCompost = await this.CompostModel.findByIdAndUpdate(
        updateCompostInput._id,
        updateCompostInput,
      )
        .session(session)
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return updateCompost;
  }

  async remove(_id: string): Promise<Compost> {
    return this.CompostModel.findByIdAndRemove(_id).exec();
  }
}

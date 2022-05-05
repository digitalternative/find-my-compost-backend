import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './schemas/user.schemas';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserInput: CreateUserInput, session: ClientSession) {
    let newUser = new this.userModel(createUserInput);
    try {
      newUser = await newUser.save({ session });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return await newUser;
  }

  findAll() {
    return this.userModel.find().exec();
  }

  async findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email: email });
  }

  async findByGoogleId(googleId: string): Promise<User> {
    return await this.userModel.findOne({ googleId: googleId });
  }

  async findByFacebookId(facebookId: string): Promise<User> {
    return await this.userModel.findOne({ facebookId: facebookId });
  }

  async remove(email: string) {
    return await this.userModel.findOneAndRemove({ email: email }).exec();
  }

  async checkPassword(password: string) {
    return await this.userModel.exists({ password: password });
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    let updateUser;
    try {
      updateUser = await this.userModel
        .findByIdAndUpdate(updateUserInput._id, updateUserInput)
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return updateUser;
  }
}

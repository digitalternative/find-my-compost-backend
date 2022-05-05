import { CreateCompostInput } from './dto/create-compost.input';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { CompostService } from './compost.service';
import { UpdateCompostInput } from './dto/update-compost.input';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';

import { BadRequestException, UseGuards } from '@nestjs/common';
import { Role } from 'src/user/enums/role.enum';
import { Roles } from 'src/user/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Resolver('Compost')
export class CompostResolver {
  constructor(
    @InjectConnection() private readonly mongoConnection: Connection,
    private readonly compostsService: CompostService,
  ) {}

  @Query('composts')
  findAll() {
    return this.compostsService.findAll();
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Query('myComposts')
  async findMine(@Context('req') req) {
    return this.compostsService.findMine(req.user._id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Query('compost')
  findOne(@Args('_id') _id: string) {
    return this.compostsService.findOne(_id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Mutation('createCompost')
  async createAll(
    @Args('createCompostInput') createCompostInputs: CreateCompostInput[],
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    const response = [];
    try {
      for (const createCompostInput of createCompostInputs) {
        response.push(this.compostsService.create(createCompostInput, session));
      }
      return response;
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException(error);
    } finally {
      session.endSession();
    }
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Mutation('updateCompost')
  async update(
    @Args('updateCompostInput') updateCompostInput: UpdateCompostInput,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const newCompost: any = await this.compostsService.update(
        updateCompostInput,
        session,
      );
      await session.commitTransaction();
      return newCompost;
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException(error);
    } finally {
      session.endSession();
    }
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Mutation('removeCompost')
  remove(@Args('_id') _id: string) {
    return this.compostsService.remove(_id);
  }
}

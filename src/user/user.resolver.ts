import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { ClientSession } from 'mongoose';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from './enums/role.enum';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('createUser')
  create(
    @Args('createUserInput') createUserInput: CreateUserInput,
    session: ClientSession,
  ) {
    return this.userService.create(createUserInput, session);
  }

  @Query('users')
  findAll() {
    return this.userService.findAll();
  }

  @Query('user')
  findOne(@Args('email') email: string) {
    return this.userService.findOne(email);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Mutation('removeUser')
  remove(@Args('email') email: string) {
    return this.userService.remove(email);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Query('checkPassword')
  checkPassword(@Args('password') password: string) {
    return this.userService.checkPassword(password);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Mutation('updateUser')
  async update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    try {
      const newUser: any = await this.userService.update(updateUserInput);
      return newUser;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CompostsService } from './composts.service';
import { CreateCompostInput } from './dto/create-compost.input';
import { UpdateCompostInput } from './dto/update-compost.input';

@Resolver('Compost')
export class CompostsResolver {
  constructor(private readonly compostsService: CompostsService) {}

  @Mutation('createCompost')
  create(@Args('createCompostInput') createCompostInput: CreateCompostInput) {
    return this.compostsService.create(createCompostInput);
  }

  @Query('composts')
  findAll() {
    return this.compostsService.findAll();
  }

  @Query('compost')
  findOne(@Args('id') id: number) {
    return this.compostsService.findOne(id);
  }

  @Mutation('updateCompost')
  update(@Args('updateCompostInput') updateCompostInput: UpdateCompostInput) {
    return this.compostsService.update(updateCompostInput.id, updateCompostInput);
  }

  @Mutation('removeCompost')
  remove(@Args('id') id: number) {
    return this.compostsService.remove(id);
  }
}

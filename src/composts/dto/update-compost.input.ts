import { CreateCompostInput } from './create-compost.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCompostInput extends PartialType(CreateCompostInput) {
  id: number;
}

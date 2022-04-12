import { Injectable } from '@nestjs/common';
import { CreateCompostInput } from './dto/create-compost.input';
import { UpdateCompostInput } from './dto/update-compost.input';
import { Compost } from './entities/compost.entity';

@Injectable()
export class CompostsService {
  private readonly composts: Compost[] = [] = [
    {
      id: 1,
      title: 'Composte de Chastre',
      email: 'chastre-composte@mail.be',
      type: 'outdoor',
      address: {
        street: 'Rue du piroy',
        city: 'Chastre',
        zipcode: '1450',
        coordinates: {
          lat: '50.60450408661511',
          lng: '4.635640580663463'
        }
      },
      phone: '010 99 99 99',
      website: 'chastre.be',
    },
  ];

  create(createCompostInput: CreateCompostInput) {
    return 'This action adds a new compost';
  }

  findAll() {
    return this.composts;
  }

  findOne(id: number) {
    return `This action returns a #${id} compost`;
  }

  update(id: number, updateCompostInput: UpdateCompostInput) {
    return `This action updates a #${id} compost`;
  }

  remove(id: number) {
    return `This action removes a #${id} compost`;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository{
  constructor(@InjectModel(User.name) private model: Model<User>) {}

  create(data: Partial<User>){
    return this.model.create(data)
  }

  findByEmail(email: string){
    return this.model.findOne({ email }).lean();
  }

  findById(id: string){
    return this.model.findById(id);
  }
}
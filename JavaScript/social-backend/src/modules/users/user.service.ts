import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  async create(data: any){
    return this.userRepo.create(data);
  }

  async findById(id: string){
    return this.userRepo.findById(id);
  }

  async findByEmail(email: string){
    return this.userRepo.findByEmail(email);
  }
}
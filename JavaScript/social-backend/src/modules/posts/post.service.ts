import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';

@Injectable()
export class PostService{
  constructor(@InjectModel(Post.name) private model: Model<Post>) {}

  async createPost(userId: string, content: string){
    return this.model.create({
      userId,
      content,
    });
  }

  async findAll() {
    return this.model.find().sort({ createdAt: -1 });
  }
}
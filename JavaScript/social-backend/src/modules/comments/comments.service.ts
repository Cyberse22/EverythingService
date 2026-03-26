import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './schemas/comment.schema';
import { Model } from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private model: Model<Comment>) {}

  async create(userId: string, postId: string, content: string) {
    return this.model.create({
      userId,
      postId,
      content,
    });
  }

  async findByPost(postId: string) {
    return this.model.find({ postId });
  }
}
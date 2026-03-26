import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Comment {
  @Prop({ type:Types.ObjectId, ref:'Post', required:true })
  postId: Types.ObjectId;

  @Prop({ type:Types.ObjectId, ref:'User', required:true })
  userId: Types.ObjectId;

  @Prop({ required:true })
  content: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
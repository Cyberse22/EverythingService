import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  // @Prop({ required: true, unique: true })
  @Prop({ unique: true })
  username: string;

  // @Prop({ required: true })
  email: string;

  // @Prop({ required: true })
  password: string;

  @Prop({ default: null })
  avatar?: string;

  @Prop({ default: 'user' })
  roles: string;

  @Prop()
  refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

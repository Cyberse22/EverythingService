import { UserSchema } from '../modules/users/schemas/user.schema';
import { PostSchema } from '../modules/posts/schemas/post.schema';

UserSchema.index({ email: 1 });
UserSchema.index({ username: 1 });

PostSchema.index({ userId: 1 });
PostSchema.index({ createdAt: -1 });

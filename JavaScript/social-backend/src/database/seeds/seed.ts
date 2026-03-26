import mongoose from 'mongoose';
import { UserSchema } from '../../modules/users/schemas/user.schema';

async function seed() {
  await mongoose.connect(process.env.MONGO_URI!);

  const User = mongoose.model('User', UserSchema);

  const exists = await User.findOne({ email: 'admin@gmail.com' });

  if (!exists) {
    await User.create({
      username: 'admin',
      email: 'admin@gmail.com',
      password: '123456',
      roles: 'admin',
    });

    console.log('✅ Admin created');
  }

  await mongoose.disconnect();
}

seed();

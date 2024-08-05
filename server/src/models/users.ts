import mongoose, { Document, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../types';

// Define an interface for Mongoose document including user properties
export interface IUserDocument extends Document {
  username: string;
  email: string;
  password: string;
  dogName: string;
  events: mongoose.Schema.Types.ObjectId[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface UserModel extends mongoose.Model<IUserDocument> {
  // Define any additional methods or static functions if needed
}

const userSchema = new Schema<IUserDocument, UserModel>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'],
  },
  password: {
    type: String,
    required: true,
  },
  dogName: {
    type: String,
    required: true,
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
});

// Hash the password before saving the user
userSchema.pre<IUserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User: UserModel = model<IUserDocument, UserModel>('User', userSchema);

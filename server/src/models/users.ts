import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUserDocument } from '../types';


// Define the User Schema
const userSchema = new Schema<IUserDocument>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  dogName: {
    type: String,
    required: true,
  },
  dogPhoto: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

// Pre-save hook to hash the user's password
userSchema.pre<IUserDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as mongoose.CallbackError);
  }
});

// Method to compare the password
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Define and export the User model
const User: Model<IUserDocument> = mongoose.model<IUserDocument>('User', userSchema);

export default User;

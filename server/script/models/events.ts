import mongoose, { Document, Schema } from 'mongoose';

// Define an interface representing a doocument in mongoDB (Typescript)
interface IEvent extends Document {
  place_id: string;
  park_name: string;
  address: string;
  date: Date;
  user: string;
  dog_avatar: string;
}

// defining the Schema for the Events
const eventSchema: Schema<IEvent> = new Schema({
  place_id: { type: String, required: true },
  park_name: { type: String, required: true },
  address: { type: String, required: true },
  date: {
    type: Date,
    required: true,
    //We'll use Eugenio is get and setter?
  },
  user: { type: String, required: true },
  dog_avatar: { type: String, required: true },
});

const Event = mongoose.model<IEvent>('Event', eventSchema);

module.exports = Event;

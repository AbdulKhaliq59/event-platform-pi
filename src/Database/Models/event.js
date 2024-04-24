import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  ticketSlots: {
    type: Number,
    required: true,
  },
  pictureUrl: {
    type: String,
    default: null, // Assuming pictureUrl is optional
  },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;

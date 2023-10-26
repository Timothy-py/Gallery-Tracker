const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "image",
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  eventType: {
    type: String,
    enum: ["view", "click"],
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create indexes on imageId and eventType to support faster querying
eventSchema.index({ imageId: 1, eventType: 1, userId: 1 });

const Event = mongoose.model("event", eventSchema);

module.exports = Event;

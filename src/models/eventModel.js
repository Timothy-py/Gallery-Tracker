const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
    required: true,
  },

  userId: {
    type: String,
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
eventSchema.index({ imageId: 1, eventType: 1 });

const Event = mongoose.model("event", eventSchema);

module.exports = Event;

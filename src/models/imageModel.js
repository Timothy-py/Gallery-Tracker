const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  _companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "company",
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
  },

  metadata: {
    title: String,
    description: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create an index on companyId to support faster querying
imageSchema.index({ _companyId: 1 });

const Image = mongoose.model("image", imageSchema);

module.exports = Image;

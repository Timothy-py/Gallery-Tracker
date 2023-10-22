const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  var DATABASE_URI = "";
  const NODE_ENV = process.env.NODE_ENV;
  if (NODE_ENV === "TEST") {
    DATABASE_URI = "mongodb://127.0.0.1:27017/gallerytest";
  } else if (NODE_ENV === "DEVELOPMENT") {
    DATABASE_URI = "mongodb://127.0.0.1:27017/gallery";
  } else {
    DATABASE_URI = process.env.MONGODB_ATLAS_URI;
  }

  await mongoose.connect(DATABASE_URI);

  const connection = mongoose.connection;
  console.log("Connection to MongoDB Atlas established successfully");
};

module.exports = connectDB;

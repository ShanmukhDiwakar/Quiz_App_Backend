const mongoose = require("mongoose");

try {
  mongoose.connect(process.env.MONGO);
  console.log("Connected to Mongo Successfully!");
} catch (error) {
  console.log(error.message);
}

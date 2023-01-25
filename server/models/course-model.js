const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
  id: { type: String },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  instructor: {
    //要連結到userSchema的物件
    type: mongoose.Schema.Types.ObjectId, //primary key
    ref: "User",
  },
  students: {
    //類型為字串的陣列
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Course", courseSchema);

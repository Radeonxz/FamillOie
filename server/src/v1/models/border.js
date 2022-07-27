const mongoose = require("mongoose");

const { schemaOptions } = require("./modelOptions");

const Schema = mongoose.Schema;
const borderSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      required: true,
      ref: "User"
    },
    icon: {
      type: String,
      default: "📃"
    },
    title: {
      type: String,
      default: "Untitled"
    },
    description: {
      type: String,
      default: `Add description here
        🟢 You can add multiline description
        🟢 Let's start...`
    },
    position: {
      type: Number
    },
    favorite: {
      type: Boolean,
      default: false
    },
    favoritePosition: {
      type: Number,
      default: 0
    }
  },
  schemaOptions
);

module.exports = mongoose.model("Border", borderSchema);

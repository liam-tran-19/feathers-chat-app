const { Schema, model } = require("mongoose");

const ChatSchema = new Schema(
  {
    idBoth: String,
    sender: Number,
    text: String,
  },
  { timestamps: true }
);

const Chat = model("chat", ChatSchema);

module.exports = Chat;

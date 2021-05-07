const { Schema, model } = require("mongoose");

const ChatSchema = new Schema(
  {
    _id: { type: String, require: true },
    messages: [
      {
        sender: Number,
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Chat = model("chat", ChatSchema);

module.exports = Chat;

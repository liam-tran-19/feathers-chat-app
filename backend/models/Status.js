const { Schema, model } = require("mongoose");

// Create Schema
const StatusSchema = new Schema({
  _id: Number,
  idPoster: Number,
  postedDetails: String,
  idLiker: [Number],
  comments: [
    {
      idCommenter: Number,
      nameCommenter: String,
      contentComment: String,
    },
  ],
  post_date: {
    type: Date,
    default: Date.now,
  },
});

const Status = model("status", StatusSchema);

module.exports = Status;

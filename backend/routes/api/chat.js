const { Router } = require("@feathersjs/express");
// User Model
const Chat = require("../../models/Chat");

module.exports = class ChatService {
  constructor() {
    this.chats = [];
  }
  async find() {
    const chats = await Chat.find().exec();
    if (!chats) {
      return [];
    }
    return (this.chats = chats);
  }

  async findOne(data) {
    const chats = await Chat.findOne(data).exec()
    if (!chats) {
      return [];
    }
    return this.chats = chats
  }

  async create(data) {
    const chat = {
      idBoth: data.idBoth,
      sender: data.sender,
      text: data.text,
    };

    Chat.create(chat);

    return chat;
  }
};

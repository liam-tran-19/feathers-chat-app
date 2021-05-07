const { Router } = require("express");
// User Model
const Chat = require("../../models/Chat");

const router = Router();

router.post("/findChat", async (req, res) => {
  const chats = await Chat.find(req.body).exec();
  res.json(chats);
});

module.exports = router;

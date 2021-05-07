const { Router } = require("express");
// User Model
const Chat = require("../../models/Chat");

const router = Router();

router.post("/find-chat", async (req, res) => {
  const chats = await Chat.find(req.body).exec();
  res.json(chats);
});

router.post("/update", async (req, res) => {
  try {
    await Chat.findOneAndUpdate(
      { _id: req.body._id },
      {
        $addToSet: {
          messages: {
            sender: req.body.message.sender,
            text: req.body.message.text,
          },
        },
      }
    );
    res.status(200).json({
      message: "successful",
    });
  } catch (error) {
    res.status(400).json({ error: e.message });
  }
});

router.post("/new-chat", async (req, res) => {
  const { _id, sender, text } = req.body;
  try {
    await Chat.create({
      _id: _id,
      messages: [
        {
          sender: sender,
          text: text,
        },
      ],
    });
    res.status(200).json({
      message: "successful",
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;

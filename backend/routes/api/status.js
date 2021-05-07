const { Router } = require("express");
const Status = require("../../models/Status");

const router = Router();

router.get("/all-posts", async(req, res) => {
  try {
    const posts = await Status.find();
    if (!posts) throw Error("No post");
    res.json(posts);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.get("/post/id/:id", async (req, res) => {
  try {
    const post = await Status.findById(req.params.id);
    if (!post) throw Error("Post does not exist");
    res.json(post);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.post("/post", (req, res) => {
  const { _id, postedDetails, idPoster } = req.body;
  if (!postedDetails) {
    return res.status(400).json({ msg: "No post" });
  }
  try {
    Status.create({
      _id: _id,
      idPoster: idPoster,
      postedDetails: postedDetails,
      idLiker: [],
      comments: [],
    });
    res.status(200).json({
      message: "Status posted",
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.put("/update/id/:id", (req, res) => {
  // const { idLiker, contentComment, idCommenter } = req.body;
  // try {
  if (!req.body.idLiker) {
    Status.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          comments: req.body.comments,
        },
      }
    )
      .then((chat) => res.json(chat))
      .catch((err) => res.status(422).json(err));
  } else if (!req.body.comments) {
    Status.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          idLiker: req.body.idLiker
        },
      }
    )
      .then((chat) => res.json(chat))
      .catch((err) => res.status(422).json(err));
  }
  
});
router.put("/delete/like-comment/:id", (req, res) => {
  // const { idLiker, contentComment, idCommenter } = req.body;
  // try {
  Status.updateOne(
    { _id: req.params.id },
    {
      $pull: {
        idLiker: req.body.idLiker,
        comments: req.body.comments,
      },
    }
  )
    .then((chat) => res.json(chat))
    .catch((err) => res.status(422).json(err));
});

router.delete("/post/id/:id", (req, res) => {
  try {
    Status.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "Successful like/comment" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;

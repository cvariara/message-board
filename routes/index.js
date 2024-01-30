const express = require("express");
const router = express.Router();
const Messages = require('../models/messages');

router.get("/", async (req, res, next) => {
  try {
    const messages = await Messages.find().sort({ timestamp: -1 });
    res.render("index", { title: "Mini Message Board", messages });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { user, message } = req.body;

  try {
    const newMessage = new Messages({
      name: user,
      message,
    });

    await newMessage.save();

    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

module.exports = router;

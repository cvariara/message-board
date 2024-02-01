const Messages = require('../models/messages');

// get messages
const getMessages = async (req, res, next) => {
  try {
    const messages = await Messages.find().sort({ timestamp: -1 });
    res.render("index", { title: "Mini Message Board", messages });
  } catch (err) {
    next(err);
  }
}

const postMessages = async (req, res, next) => {
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
}

module.exports = {
  getMessages,
  postMessages
}
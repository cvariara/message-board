const Messages = require('../models/messages');
const { formatDistanceToNow } = require('date-fns');

// get messages
const getMessages = async (req, res, next) => {
  try {
    const messages = await Messages.find().sort({ timestamp: -1 });

    // Convert timestamp strings to Date objects
    const formattedMessages = messages.map(message => ({
      ...message._doc,
      //timestamp: format(new Date(message.timestamp), 'MM-dd-yyyy HH:mm')
      timestamp: formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })
    }));

    res.render("index", { title: "Mini Message Board", messages: formattedMessages });
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
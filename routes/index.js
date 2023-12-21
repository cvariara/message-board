const express = require("express");
const router = express.Router();

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
let date = new Date().toLocaleString("en-US", {
  timeZone: userTimeZone,
  hour: "2-digit",
  minute: "2-digit",
  year: "numeric",
  month: "numeric",
  day: "numeric",
});

const messages = [
  {
    text: "Hello World!",
    user: "Chris",
    added: date,
  },
  {
    text: "Hello Chris!",
    user: "Bob",
    added: date,
  },
];

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Mini Message Board", messages: messages });
});

router.post("/", (req, res, next) => {
  messages.push({
    text: req.body.message,
    user: req.body.user,
    added: new Date().toLocaleString("en-US", {
      timeZone: userTimeZone,
      hour: "2-digit",
      minute: "2-digit",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }),
  });
  res.redirect("/");
});

module.exports = router;

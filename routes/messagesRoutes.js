const express = require("express");
const { getMessages, postMessages } = require('../controllers/messagesController');

const router = express.Router();

router.get("/", getMessages);

router.post("/", postMessages);

module.exports = router;

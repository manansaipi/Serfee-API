const express = require("express");

const chatsController = require("../controller/chats");

const router = express.Router();

router.get("/", chatsController.getMessage);

router.post("/", chatsController.pushMessage);

router.patch("/:id", chatsController.updateMessage);

router.delete("/:id", chatsController.deleteMessage);

module.exports = router;
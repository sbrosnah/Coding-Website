const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const photos = require("./code.js");
const Code = photos.model;

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  code: {
    type: mongoose.Schema.ObjectId,
    ref: 'Photo'
  },
  text: String,
  commentCreated: {
    type: Date,
    default: Date.now
  },
});

const Comment = mongoose.model('Comment', commentSchema);

router.post("/:id", validUser, async (req, res) => {
  let code = await Code.findOne({
    _id: req.params.id,
  }).populate('user');
  const comment = new Comment ({
    user: req.user,
    code: code,
    text: req.body.text,
  });
  try {
    await comment.save();
    return res.sendStatus(200);
  } catch(error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let comments = await Comment.find({
      code: req.params.id,
    }).sort({
      created: -1
    }).populate('user');
    return res.send(comments);
  } catch(error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: Comment,
  routes: router,
}

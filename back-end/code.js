const express = require("express");
const mongoose = require('mongoose');

const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const codeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  },
  code: String,
  problemId: String,
});

const Code = mongoose.model('Code', codeSchema);

router.post('/:id', validUser, async(req, res) => {
  const code = new Code({
    code: req.body.code,
    user: req.user,
    problemId: req.params.id
  });
  try {
    await code.save();
    return res.sendStatus(200);
  }catch(error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get('/:id', async(req, res) => {
  try {
    let codes = await Code.find({
      problemId: req.params.id
    }).sort({
      created: -1
    }).populate('user');
    return res.send(codes);
  }catch(error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get('/users/:id/:problemID', validUser, async(req, res) =>{
  try {
    let codes = await Code.find({
      user: req.params.id,
      problemId: req.params.problemID,
    }).sort({
      created: -1
    }).populate('user');
    return res.send(codes);
  }catch(error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete('/:id', validUser, async(req, res) => {
  try {
    let code = await Code.findOne({
      _id: req.params.id
    });
    await code.delete();
    return res.sendStatus(200);
  } catch(error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.put('/:id', validUser, async(req, res) => {
  try {
    let code = await Code.findOne({
      _id:req.params.id
    });
    if(!code) {
      res.send(404);
      return;
    }
    code.code = req.body.code;
    await code.save();
    res.send(code);
  }catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = {
  routes: router,
  model: Code,
};

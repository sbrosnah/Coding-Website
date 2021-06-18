const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// connect to the database
mongoose.connect('mongodb://localhost:27017/creative-project', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});


const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: [
    'secretValue'
  ],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));



const users = require('./users.js');
app.use("/api/users", users.routes);

const code = require('./code.js');
app.use("/api/code", code.routes);

const comments = require('./comments.js');
app.use("/api/comments", comments.routes);

app.listen(3002, () => console.log('Server listening on port 3002!'));

/*
app.post('/api/codes', async (req, res) => {
  const code = new Code({
    text: req.body.text,
    language: req.body.
  });
  try {
    await code.save();
    res.send(code);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/codes', async (req, res) => {
  try {
    let codes = await Code.find();
    res.send(codes);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/codes/:id', ansyc (req, res) => {
  try {
    let code = await Code.findOne({_id: req.params.id});
    if (!item) {
      res.send(404);
      return;
    }
    code.text = req.body.text;
    code.language = req.body.language;
    await code.save();
    res.send(code);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/codes/:id', ansyc (req, res) => {
  try {
    let code = await Code.findOne({_id: req.params.id});
    if (!item) {
      res.send(404);
      return;
    }
    await code.delete();
    res.sendStatus(200);
    res.send(code);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});
*/

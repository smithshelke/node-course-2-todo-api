var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todos');
var {User} = require('./models/users');

var express = require('express');
var bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.json());
app.use((req,res,next)=>{
  console.log("i was trigered");
  console.log(req.body,'from middleware');
  next();
})

app.post('/todos',(req,res)=>{
  console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then(doc=>{
    res.send(doc);
  },e=>{
    res.status(400).send(e);
  })
});

app.get('/todos',(req,res)=>{
  Todo.find({}).then((todos)=>{
    res.send({todos});
  },(e)=>{
    res.status(400).send(e);
  })
})

app.listen(3000,()=>{
  console.log('Started on port 3000');
});


module.exports = {app};

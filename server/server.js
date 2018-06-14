var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todos');
var {User} = require('./models/users');

var {ObjectID} = require('mongodb');
var express = require('express');
var bodyparser = require('body-parser');

var app = express();
const port = process.env.PORT||3000;
app.use(bodyparser.json());
app.use((req,res,next)=>{
  next();
});

app.post('/todos',(req,res)=>{
//  console.log(req.body);
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
  }).catch(e=>{
      console.log(e);
  });
});

app.get('/todos/:id',(req,res)=>{
  var id = req.params.id;
  if(ObjectID.isValid(id)){
  //  res.send(req.params);
     Todo.findById(id).then(todo=>{
       if(!todo){
         res.status(404).send('todo not found')
       }
       res.send({todo});
     },e=>{
       res.status(400).send(e);
     }).catch(e=>{

     });
  }
  else {
    res.status(404).send('id not valid');
  }
})

app.listen(port,()=>{
  console.log('Started on port',port);
});


module.exports = {app};

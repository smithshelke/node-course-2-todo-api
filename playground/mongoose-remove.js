const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');

const {ObjectID} = require('mongodb');
const {User} = require('./../server/models/users');

// Todo.remove({}).then(result=>{
//   console.log(result);
// });

//Todo.findOneAndRemove()
Todo.findByIdAndRemove('5b2200a3f9597b320c3000d6').then(todo=>{
    console.log(todo);
});

Todo.findOneAndRemove(_id:'5b2200a3f9597b320c3000d6').then(todo=>{
  console.log(todo);
});

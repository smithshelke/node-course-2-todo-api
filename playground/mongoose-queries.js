const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');

const {ObjectID} = require('mongodb');

var id = 'b20a84d15d2931344754ec4';
isIdValid =ObjectID.isValid(id);
if(!isIdValid){
  console.log('ID not valid');
}

Todo.find({
  _id:id
}).then(todos=>{
  console.log("todo",todos);
});

Todo.findOne({completed: false})
  .then(todo=>{
    console.log('todo by completed',todo);
  })

Todo.findById(id).then(todo=>{
  console.log('todo by id',todo );
}).catch(e=>{
  console.log(e);
});

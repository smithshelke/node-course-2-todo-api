const MongoClient = require('mongodb').MongoClient;
//smith -- mohith\
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    //const db = client.db('TodoApp')
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');
    // db.collection('Todos').deleteMany({text:'Lunch'}).then((result)=>{
    //     console.log(result)
    // });
    // db.collection('Todos').deleteOne({text: 'Walk the dog'}).then((result)=>{
    //     console.log(result);
    // });
    db.collection('Todos').findOneAndDelete({completed: false}).then((result)=>{
        console.log(result);
    })
});

const {MongoClient,ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,client)=>{
    if(error){
        return console.log('Unable to connect to MongoDB server',error);
    }
    const db = client.db('TodoApp');
    // db.collection('Todos').find({
    //     _id:new ObjectID('5b04ffa13e4fda19bcfe612d')})
    //     .toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     console.log('Unable to fetch todos',err);
    // });
    db.collection('Todos').find().count().then((count)=>{
        console.log(`Todos count: ${count}`);
    },(err)=>{
        console.log('Unable to fetch todos',err);
    })
});

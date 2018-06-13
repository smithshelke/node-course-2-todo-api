const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    //const db = client.db('TodoApp')
    console.log('Connected to MongoDB server');
    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // },(err,result)=>{
    //     if(err){
    //         return console.log('Unable to insert',err);;
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });
    const db = client.db('Users')
    db.collection('Users').insertOne({
        name: 'smith',
        age: 19,
        location: 'mumbai'
    },(err,res)=>{
        if(err){
            return console.log('Unable to insert user');;
        }
        console.log(res);
    });

    client.close();
});

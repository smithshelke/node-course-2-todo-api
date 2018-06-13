const {MongoClient,ObjectID} = require('mongodb');
//smith -- mohith\
// MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
//     if(err){
//         return console.log('Unable to connect to MongoDB server');
//     }
//
//     console.log('Connected to MongoDB server');
//     const db = client.db('TodoApp');
//     db.collection('Todos').findOneAndUpdate(
//         {_id: new ObjectID('5b0ff3254c603bc81447be9f')},
//         {
//             $set:{
//                 completed: true
//             }
//         },
//         {
//             returnOriginal: false
//         }
//     ).then((result)=>{
//         console.log(result);
//     })
// });
MongoClient.connect('mongodb://localhost:27017/TodoApadsp',(err,client)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server');
    const db = client.db('Users');
    db.collection('Users').findOneAndUpdate(
        {_id: new ObjectID('5b0e6b1e5a5e562d3ed735d4')},
        {
            $set:{
                name: 'Jen'
            },
            $inc:{
                age: 2
            }
        },
        {
            returnOriginal: false
        }
    ).then((result)=>{
        console.log(result);
    })
});

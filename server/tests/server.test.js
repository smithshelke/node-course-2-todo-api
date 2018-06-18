const expect = require('expect');
const request = require('supertest');
const{ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todos');

const todos = [
  {
    _id: new ObjectID(),
    text:"First test todo"},
    {
      _id: new ObjectID(),
      text:"Second test todo"}
    ];

    beforeEach((done)=>{
      Todo.remove({}).then(()=>{
        return Todo.insertMany(todos);
      }).then(()=>{done();})
    });

    describe('POST /todos',()=>{
      it('should create a new todo',(done)=>{
        var text = 'Test todo test';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>{
          expect(res.body.text).toBe(text);
        })
        .end((err,res)=>{
          if(err){
            return done(err);
          }
          Todo.find().then((todos)=>{
            expect(todos.length).toBe(3);
            expect(todos[2].text).toBe(text);
            done();
          }).catch((e)=>done(e));
        });
      });
    });

    it('should not create todo with invalid body data',(done)=>{
      request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err,res)=>{
        if(err){
          return done(err);
        }
        Todo.find().then((todos)=>{
          expect(todos.length).toBe(2);
          done();
        }).catch((e)=> done(e));
      });
    });

    describe('GET /todos',()=>{
      it('should get all todos',(done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect(res=>{
          expect(res.body.todos.length).toBe(2);
        })
        .end(done);
      })
    });

    describe('GET /todos/:id',()=>{
      it('should return todo',(done)=>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect(res=>{
          expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
      });

      it('should return 404 if todo not found',done=>{
        request(app)
        .get(`/todos/6b20a84d15d2931344754ec4`)
        .expect(404)
        .expect(res=>{
          //console.log('---------',res,'---------');
          expect(res.text).toBe('todo not found');
        })
        .end(done);
      });

      it('should return 404 for non-object ids',done=>{
        request(app)
        .get(`/todos/123`)
        .expect(404)
        .expect(res=>{
          expect(res.text).toBe('id not valid');
        })
        .end(done);
      });
    });

    describe('DELETE /todo/:id',()=>{
      it('should remove a todo',(done)=>{
        var hexId = todos[1]._id.toHexString();
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect(res=>{
          expect(res.body.todo._id).toBe(hexId)
        })
        .end((err,res)=>{
          if(err){
            return done(err);
          }
          Todo.findById(hexId).then(todo=>{
            expect(todo).toBeNull();
            done();
          }).catch(e=>done(e))
        })
      });

      // it('should return 404 if todo not found',done=>{
      //
      // });
      //
      // it('it should return 404 if objectID is invalid',done=>{
      //
      // });
    });

    describe('PATCH /todos/:id',()=>{
      it('should update the todo',done=>{
        var hexId = todos[0]._id.toHexString();
        var text = 'This should be the new text.'

        request(app)
        .patch(`/todos/${hexId}`)
        .send({
          completed: true,
          text
        })
        .expect(200)
        .expect(res=>{
          console.log(res.body);
          expect(res.body.todo.text).toBe(text);
          expect(res.body.todo.completed).toBe(true);
          expect(typeof res.body.todo.completedAt).toBe('number');
        })
        .end(done);
      });
  it('should clear completedAt when todo is  not completed',done=>{
    var hexId = todos[1]._id.toHexString();
    var text = 'This should be the new text!!'

    request(app)
    .patch(`/todos/${hexId}`)
    .send({
      completed: false,
      text
    })
    .expect(200)
    .expect(res=>{
      console.log(res.body);
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toBeNull();
    })
    .end(done);
  });
});

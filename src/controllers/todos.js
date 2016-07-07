// Require dependencies
var express = require('express'),
    Todos   = express.Router(),
    fs      = require('fs');
    mongoose = require('mongoose'),
    User    = require('../models/user');

// A single TODO resource
Todos.route('/:id/?')
  // GET /todos/:id
  // --------------
  // Gets a single Todo
  .get(function(req, res, next) {
    res.json({message: 'You asked for ' + req.params.id});
  })
  // PATCH /todos/:id
  // ----------------
  // Updates a single todo by ID
  .patch(function(req, res, next) {
    // 1. Find the resource
    // 2. Update the resource
    // 3. Save it back to the database
    res.json({message: 'Updated todo at ' + req.params.id});
  })
  // DELETE /todos/:id
  // -----------------
  // Route responsible for deleting items based on ID
  .delete(function(req, res, next) {
    res.json({message: 'You deleted todo number ' + req.params.id});
  });

Todos.route('/?')
  .get(function(req, res){
    User.find(function(err, users){
      console.log(users)
      console.log(err)
      res.json(users)
    })
  })
  // POST /mongoose
  .post(function(req, res){
    res.json({message: 'You made a new one'});
    // User.create({username: 'Jim', password: '1234'}, function(err, user){
    //   console.log(user)
    //   res.json(user)
    // })
  });

// NO COPY UNDER THIS LINE
//-------------------------
  // Todos.put('/mongoose/:id', function(req, res, next) {
  // console.log(req.body);
  //   User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
  //     if (err) return next(err);
  //     res.json(user)
  //   });
  // });


  // Todos.patch('/mongoose/:id', function(req, res, next) {
  //   console.log(req.body);
  //   User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
  //     if (err) return next(err);
  //     res.json(user);
  //   });
  // });















Todos.route('/home/?')
  // GET /todos/:id
  // --------------
  // Get the todo with this ID number
  .get(function(req, res, next) {
    res.render('form', {});
  })

  .post(function(req, res, next){
    console.log(req.body)
    res.send('request recieved')
  });


Todos.route('/:id/?')
  // GET /todos/:id
  // --------------
  // Responds to requests for
  // todo item details
  .get(function(req, res, next) {
    // Get the ID from the URL
    var id    = parseInt(req.params.id),
        todos = fs.readFileSync(__dirname + '/../db/todos.json');

    // Turn  todos into string parsed into a POJO
    todos = JSON.parse(todos.toString());

    var TodoModel = require(__dirname + '/../models/todo'),
        Todo      = new TodoModel('Feed the homeless man in the basement', 'Make sure his chains are tied tight');

    Todo.parse();
    var saved = Todo.save();

    res.render('detail', {
      pageTitle:  todos[id].name,
      todo:       todos[id],
      saved:      saved ? 'YES' : 'NO'
    })
  });



module.exports = Todos;

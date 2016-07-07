// Require dependencies
var express = require('express'),
    Todos   = express.Router(),
    fs      = require('fs');
    // mongoose = require('mongoose'),
    // User    = require('../models/user');

//mongoose routesssssssssssssssss

// Todos.route('/mongoose')


//   .get(function(req, res){
//     User.find(function(err, users){
//       console.log(users)
//       console.log(err)
//       res.json(users)
//     })


//   })

//   .post(function(req, res){

//     User.create({username: 'Jim', password: '1234'}, function(err, user){
//       console.log(user)
//       res.json(user)
//     })
//   })

















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

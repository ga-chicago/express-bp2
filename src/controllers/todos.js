// Require dependencies
var express = require('express'),
    Todos   = express.Router(),
    fs      = require('fs');

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

Todos.route('/:id/?')
  // GET /todos/:id
  // --------------
  // Get the todo with this ID number
  .get(function(req, res, next) {
    res.send('WRONG PLACE!');
  });

module.exports = Todos;

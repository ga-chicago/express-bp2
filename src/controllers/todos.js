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

    res.render('detail', {
      pageTitle:  todos[id].name,
      todo:       todos[id]
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

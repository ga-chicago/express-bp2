// Main Server File
// ================
// Responsible for configuring, 
// starting, and running the server.

// Require the dependencies
var express = require('express'),
    app     = express(),
    exphbs  = require('express-handlebars'),
    fs      = require('fs');

// Configuring the applicartion
app.engine('hbs', exphbs({
  defaultLayout:  'main',
  partialsDir:    __dirname + '/views/partials',
  layoutsDir:     __dirname + '/views/layouts',
  extname:        '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// Configure serving static assets
app.use(express.static(__dirname + '/public'));

// Example of members ony middleware
app.use('/members_only/?', function(req, res, next) {
  if (req.session.isLoggedIn) {
    return next()
  } else {
    // flash messages
    res.redirect('/login');
  }
});

// Define the todos route
app.route('/todos/:id/?')
  .get(function(req, res, next) {
    var id    = parseInt(req.params.id),
        todos = fs.readFileSync(__dirname + '/db/todos.json');

    todos = JSON.parse(todos.toString()); // Turn todos file into JS object

    res.render('detail', {
      pageTitle: todos[id].name,
      todo:      todos[id]
    });
  });

// Define home page
app.route('/?')
  .get(function(req, res, next) {
    var todos = fs.readFileSync(__dirname + '/db/todos.json');

    res.render('home', {
      pageTitle:  'Homepage',
      // todos:      ['Hello', 'This', 'Is', 'An Array.', 'Hi.']
      todos:      JSON.parse(todos.toString())
    });
  })
  .post(function(req, res, next) {
    // response here
  })

// Start server, listen in on a port
var server = app.listen(3000, function() {
  console.log('Server listening at http://localhost:' + server.address().port);
});

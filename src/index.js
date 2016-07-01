// Main Server File
// ================
// Responsible for configuring, 
// starting, and running the server.

// Require the dependencies
var express = require('express'),
    app     = express(),
    exphbs  = require('express-handlebars'),
    fs      = require('fs');

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

// Define home page
app.route('/?')
  .get(function(req, res, next) {
    var todos = fs.readFileSync(__dirname + '/db/todos.json');

    res.render('home', {
      pageTitle:  'Homepage',
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

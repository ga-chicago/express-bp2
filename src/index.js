// Main Server File
// ================
// Responsible for configuring,
// starting, and running the server.

// Require the dependencies
var express     = require('express'),
    app         = express(),
    exphbs      = require('express-handlebars'),
    fs          = require('fs'),
    bodyParser  = require('body-parser'),
    session     = require('express-session');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


// Configuring the applicartion
app.engine('hbs', exphbs({
  defaultLayout:  'main',
  partialsDir:    __dirname + '/views/partials',
  layoutsDir:     __dirname + '/views/layouts',
  extname:        '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(session({
  name: 'sessionclass',
  resave: false,
  saveUninitialized: false,
  secret: 'xw4gfqgV89qjarqDzF8pCje9'
}));
// Configure serving static assets
app.use(express.static(__dirname + '/public'));

// require the database

require('./models/db')

// Mount all middleware routes

app.use('/todos/?', require('./controllers/todos'));
app.use('/membersonly/?', function(req, res, next) {
  if (req.session.isLoggedIn === true) {
    next();
  } else {
    res.redirect('/');
  }
})
app.use('/membersonly/?', function(req, res, next) { res.send('You are a member!') })
app.use(require('./controllers/authentication'));

// Start server, listen in on a port
var server = app.listen(3000, function() {
  console.log('Server listening at http://localhost:' + server.address().port);
});

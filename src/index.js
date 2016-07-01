// Main Server File
// ================
// Responsible for configuring, 
// starting, and running the server.

// Require the dependencies
var express = require('express'),
    app     = express();

// Define home page
app.route('/?')
  .get(function(req, res, next) {
    res.send('Homepage');
  })
  .post(function(req, res, next) {
    // response here
  })

// Start server, listen in on a port
var server = app.listen(3000, function() {
  console.log('Server listening at http://localhost:' + server.address().port);
});

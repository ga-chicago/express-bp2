# Express Boilerplate 2

> An Express boilerplate that includes proper Controller syntax and a full suite of Gulp tasks

This project is constantly evolving as we work through Express and Gulp .

*Note that this is a constantly evolving Express app with Gulp tasks*

## Installation and Setup

To get a copy of this project and start using it:

1. Clone the repo with `git clone git@github.com:ga-chicago/express-bp2.git`
2. `cd express-bp2` to enter the project root
3. You need a couple of global dependencies to make this work. Install the Gulp CLI and Bower with `npm install -g gulp-cli bower`
4. Now install local dependencies with `npm install && bower install`

### Run the app

Running the application is as simple as running `gulp` in your terminal within your project root. The Gulp tasks will:

- Start a local server
- Watch for changes to important front- and back-end files
- Transpile LESS into CSS
- *...and more!* (If you want)

## Purpose

This application is meant to teach students how Express works and how Gulp tasks help you automate development tasks. It will/does evolve over time from a simple `app.method()` based application to one that uses proper controllers and models. We set it up with some basic Gulp tasks and Express routes and middleware from the start and the evolution begins there.

### Mounting Controllers as Middleware

Create a new instance of `express.Router()`, assign it to your controller, write your routes and controller code, then export it as a module. Once exported you should mount the middleware in the correct place.

__Example__

*src/index.js - Main server file*

```js
// Assume dependencies have been required
// --------------------------------------
// Also assume we're building a todo list app


// Configuration of settings goes here
// -----------------------------------
// Middleware that use 'next()' to pass on
// a changed request or response go here. For
// example, Handlebars config, static file serving,
// and any other middleware that change the data
// as it flows through the system go here.


// Mount any middleware here
// -------------------------
// This is where your custom controllers
// get mounted. We do this to make the app easier to
// organize.
app.use('/todos/?', required('./src/controllers/todos'));


// GET /
// -----
// The "simple", less preferable way to create routes - this
// one is for the homepage
app.route('/')
  .get(function(req, res, next) {
    res.render('home', {
      pageTitle: 'Homepage',                
    })
  });


// Error handling middleware
// -------------------------
// This is where your 404 and 500 errors 
// get handled
app.use(function(err, req, res, next) {
  // This is where we handle 404s and 500 errors
});


// Start the server
// ----------------
// The server will listen on port 3000
var server = app.listen(3000, function() {
  console.log('Server started at http://' + server.address().host + ':' + server.address().port);
  // Should log 'Server started at http://localhost:3000/'
});

// Now the server is running!
```

*src/controllers/todos.js - The Todos Controller File*

```js
// Require deps
// ------------
var express         = require('express'),
    TodosController = express.Router(),
    fs              = require('fs');


// Load up the JSON file to use as our
// database - a poor man's DB
var todoList  = fs.readFileSync(__dirname + '/../'),  // Read contents of todos JSON file
    todo      = JSON.parse(todoList.toString());      // Turn JSON data into a POJO


// Set up the routes
// -----------------
// This works the same as 'app.whatever()'
TodoController.route('/:id/?')
  // GET /todos/:id/
  // ---------------
  // Render a single todo item
  .get(function(req, res, next) {
    // Render a todo detail page
    var id = parseInt(req.params.id);

    res.render('detail', {
      pageTitle: todo[id].name,
      todo:      todo[id]
    });
  }); // You can chain additional methods here if needed (like '.post()' or '.delete()')


// Here you can create more TodoControllers
// mounted at different paths if you need them.


module.exports = TodosController; // You export the controller you made so it can be used in the main server file
                                  // or anywhere else you need it
```

These two example files are an example of how you create a controller within a separate file. So now your `index.js` just mounts the exported `TodosController` object at `/todos/` and this file will run when anyone enters any URL that looks something like any of these:

- `/todos/1/` - Shows the detail page for the Todo with ID #1
- `/todos/edit/` - Renders a form that is used to update a todo
- `/todos/whatever-else/` - Basically any URL that begins with `/todos/`

## Gulp Tasks

We have Gulp tasks set up for watching files, running servers, transpiling LESS, etc.

## Project Configuration

We have a `.editorconfig` file that keeps everyone's editor's in sync (corrects/sets tabs vs. spaces, etc.).

We have a `.bowerrc` file that defines where in the project any front-end dependencies installed via Bower are installed. In this case we store our front-end assets in `src/public/vendor/`. Those front-end assets should be ignored by Git and Gulp tasks should be used to integrate the files into the project.

The `bower.json` file is similar to `package.json`. It defines the front-end dependencies used by your project.

The `.gitignore` file makes sure the those pesky Mac `.DS_Store` files don't make it into the project and also keeps out all of our dependencies from `node_modules/` to `src/public/vendor/`.

## What's next?

There's a whole lot more to do to make this app scale. We'll soon be upgrading this with a real database.

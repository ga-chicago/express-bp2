var fs = require('fs'),
    db = fs.readFileSync(__dirname + '/../db/todos.json').toString();

function Todo(name, description) {
  this.name         = name        || false;
  this.description  = description || false;
}

// Parse string DB into a POJO
Todo.prototype.parse = function() {
  this.db = JSON.parse(db);
};

Todo.prototype.save = function() {
  var self = this;

  var newTodo = {
    name:         self.name,
    description:  self.description
  }

  this.db.push(newTodo);

  this.db = JSON.stringify(this.db);

  // Save it to the database
  fs.writeFile(__dirname + '/../db/todos.json', this.db, function(err) {
    if (err) {
      console.log(err);
      return false;
    } else {
      console.log('Success');
      return true;
    }
  })
};

module.exports = Todo;

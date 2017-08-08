// dependency requirement for libraries
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const mustacheExpress = require ('mustache-express');
// Create app instance for Express
const app = express();
// Connect to mongo DB through Mongoose ('recipes' is database name)
mongoose.connect('mongodb://localhost:27017/books');
app.use(express.static('public'));
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
      Book.find().then(function(books){
        res.render('books',{books})
      });
});

const bookSchema = new mongoose.Schema({
  title: String,
  pages: Number,
  author: String,
  isbn:{ type:Number, unique: true},
  genre: {type: String, lowercase: true },
  synopsis: String,
  format: { type: String, lowercase: true, default: 'book'}
});

const Book = mongoose.model('Book', bookSchema);
var book = new Book();
book.author = "Hamlen Juza's Twin";
book.title = "Hamlen Juza's  Other Twin's Brothers Twin";
book.pages = 20;
book.isbn = 12;
book.genre = "horror";
book.synopsis = "A book about a robot with a horrifying life during Vietnam where he discovered he was actually his own brother's twin.";
book.format = "virtual reality"

book.save().then(function() {
  //actions after successful save
  console.log('book saved');
  }).catch(function () {
    console.log('Mongo couldn\'t save the book');
  //handle Error
  });
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

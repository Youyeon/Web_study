// npm init : Create package.json
var express = require('express');
var app = express();
var http = require('http');
var url = require('url');
var topic = require('./lib/topic');
var author = require('./lib/author');
var bodyParser = require('body-parser'); //express에 내장
var compression = require('compression');

app.use(express.static('public')); //public directory 안에서 static file을 찾음
app.use(bodyParser.urlencoded({extended: false})); //body-parser middleware
app.use(compression()); //compression middleware

app.get('/', function(request, response) {
  topic.home(request, response);
});
app.get('/page/:pageId', function(request, response) {
  topic.page(request, response);
});
app.get('/create', function(request, response) {
  topic.create(request,response);
});
app.post('/create_process', function(request, response) {
  topic.create_process(request, response);
});
app.get('/update/:pageId', function(request, response) {
  topic.update(request, response);
});
app.post('/update_process', function(request, response) {
  topic.update_process(request, response);
});
app.post('/delete_process', function(request, response) {
  topic.delete_process(request, response);
});
app.get('/author', function(request, response) {
  author.home(request, response);
});
app.post('/author/create_process', function(request, response) {
  author.create_process(request, response);
});
app.get('/author/update/:authorId', function(request, response) {
  author.update(request, response);
});
app.post('/author/update_process', function(request, response) {
  author.update_process(request, response);
});
app.post('/author/delete_process', function(request, response) {
  author.delete_process(request, response);
});

app.use(function (req, res, next) {
  res.status(404).send('404 NOT FOUND');
});
app.use(function(err, req, res, next) {
  res.status(500).send('Something Broke!');
});

app.listen(3000,function(){});
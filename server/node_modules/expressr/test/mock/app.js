'use strict';

var fs = require('fs')
  , async = require('async');

var app = require('express')();

app.use(require('../../index')());

app.get('/', function(req, res) {
  res.send('Hello World');
});

app.get('/getString', function(req, res) {
  res.send('Hello ' + req.getString('name', 'World'));
});

app.get('/getString/:name', function(req, res) {
  res.send('Hello ' + req.getString('name'));
});

app.get('/getStrings', function(req, res, next) {
  res.send(req.getStrings('foo').join(', '));
});

app.get('/getInteger', function(req, res, next) {
  res.send('foo=' + req.getInteger('foo', -1));
});

app.get('/getIntegers', function(req, res, next) {
  res.send(req.getIntegers('foo').map(function(num) { return num + 1 }).join(', '));
});

app.get('/getNumber', function(req, res, next) {
  res.send('foo=' + req.getNumber('foo', -1));
});

app.get('/getNumbers', function(req, res, next) {
  res.send(req.getNumbers('foo').map(function(num) { return num + 1 }).join(', '));
});

app.get('/getMoment', function(req, res, next) {
  var m = req.getMoment('foo', '2014-09-13');
  res.send(m.dayOfYear().toString());
});

app.get('/getMoments', function(req, res, next) {
  var dates = req.getMoments('foo', '2014-09-12');
  res.send(dates.map(function(m) {
    return m.format('DD.MM.YY');
  }).join(' '));
});

app.post('/getFile', function(req, res, next) {
  var file = req.getFile('file');
  fs.readFile(file.path, function(err, text) {
    if (err) return next(err);
    res.send(file.safeName + ': ' + text);
  });
});

app.post('/getFiles', function(req, res, next) {
  var files = req.getFiles('files');
  async.map(files, function(file, cb) {
    fs.readFile(file.path, function(err, text) {
      if (err) return cb(err);
      cb(null, file.safeName + ': ' + text);
    });
  }, function(err, results) {
    if (err) return next(err);
    res.send(results.join('\n'));
  });
});

app.get('/getPath/*', function(req, res, next) {
  res.send(req.getPath(0));
});

module.exports = function(cb) {
  require('http').createServer(app).listen(8123, cb);
};

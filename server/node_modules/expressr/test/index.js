"use strict";

var request = require('request')
  , assert = require('assert')
  , fs = require('fs');

describe('Request extensions', function() {

  before(function(cb) {
    require('./mock/app')(cb);
  });

  describe('getString', function() {

    it('resolves named parameters', function(cb) {
      request.get('http://localhost:8123/getString/Alice', function(err, res, body) {
        if (err) return cb(err);
        assert.equal(body, 'Hello Alice');
        cb();
      });
    });

    it('returns default value', function(cb) {
      request.get('http://localhost:8123/getString', function(err, res, body) {
        if (err) return cb(err);
        assert.equal(body, 'Hello World');
        cb();
      });
    });

    it('resolves a parameter from query string', function(cb) {
      request.get('http://localhost:8123/getString?name=Alice', function(err, res, body) {
        if (err) return cb(err);
        assert.equal(body, 'Hello Alice');
        cb();
      });
    });

  });

  describe('getStrings', function() {

    it('resolves an array of strings', function(cb) {
      request.get('http://localhost:8123/getStrings?foo=one&foo=two', function(err, res, body) {
        if (err) return cb(err);
        assert.equal(body, 'one, two');
        cb();
      });
    });

    it('returns a single-string array', function(cb) {
      request.get('http://localhost:8123/getStrings?foo=one', function(err, res, body) {
        if (err) return cb(err);
        assert.equal(body, 'one');
        cb();
      });
    });

    it('returns an []', function(cb) {
      request.get('http://localhost:8123/getStrings', function(err, res, body) {
        if (err) return cb(err);
        assert.equal(body, '');
        cb();
      });
    });

  });

  describe('getInteger', function() {

    it('returns a parsed integer', function(cb) {
      request.get('http://localhost:8123/getInteger?foo=3.14', function(err, res, body) {
        if (err) return cb(err);
        assert.equal(body, 'foo=3');
        cb();
      });
    });

    it('returns a default value if parameter unspecified', function(cb) {
      request.get('http://localhost:8123/getInteger', function(err, res, body) {
        if (err) return cb(err);
        assert.equal(body, 'foo=-1');
        cb();
      });
    });

  });

  describe('getIntegers', function() {

    it('parses an array of integers', function(cb) {
      request.get('http://localhost:8123/getIntegers?foo=10&foo=abc&foo=2', function(err, res, body) {
        if (err) return cb(err);
        assert.equal(body, '11, 3');
        cb();
      });
    });

  });

  describe('getNumber', function() {

    it('returns a parsed number', function(cb) {
      request.get('http://localhost:8123/getNumber?foo=3.14', function(err, res, body) {
        if (err) return cb(err);
        assert.equal(body, 'foo=3.14');
        cb();
      });
    });

    it('returns a default value if parameter unspecified', function(cb) {
      request.get('http://localhost:8123/getNumber', function(err, res, body) {
        if (err) return cb(err);
        assert.equal(body, 'foo=-1');
        cb();
      });
    });

  });

  describe('getNumbers', function() {

    it('parses an array of numbers', function(cb) {
      request.get('http://localhost:8123/getNumbers?foo=10.3&foo=abc&foo=2.3',
        function(err, res, body) {
          if (err) return cb(err);
          assert.equal(body, '11.3, 3.3');
          cb();
        });
    });

  });

  describe('getMoment', function() {

    it('parses a Moment date', function(cb) {
      request.get('http://localhost:8123/getMoment?foo=1988-01-29', function(err, res, body) {
        if (err) return cb(err);
        assert.equal(body, '29');
        cb();
      });
    });

    it('falls back to default value', function(cb) {
      request.get('http://localhost:8123/getMoment?foo=abc', function(err, res, body) {
        if (err) return cb(err);
        assert.equal(body, '256');
        cb();
      });
    });

  });

  describe('getMoments', function() {

    it('parses an array of Moment dates', function(cb) {
      request.get('http://localhost:8123/getMoments?foo=1988-01-29&foo=1988-09-05',
        function(err, res, body) {
          if (err) return cb(err);
          assert.equal(body, '29.01.88 05.09.88');
          cb();
        });
    });

  });

  describe('getFile', function() {

    it('parses a single uploaded file', function(cb) {
      var post = request.post('http://localhost:8123/getFile', function(err, res, body) {
        if (err) return cb(err);
        assert.equal(body, 'upload_me: Hi there, bro!\n');
        cb();
      });
      var form = post.form();
      form.append('file', fs.createReadStream(__dirname + '/mock/public/UPLOAD ME'));
      form.append('file', fs.createReadStream(__dirname + '/mock/public/UPLOAD ME'));
    });

  });

  describe('getFiles', function() {

    it('parses multiple uploaded files', function(cb) {
      var post = request.post('http://localhost:8123/getFiles', function(err, res, body) {
        if (err) return cb(err);
        assert.equal(body, 'upload_me: Hi there, bro!\n\nupload_me: Hi there, bro!\n');
        cb();
      });
      var form = post.form();
      form.append('files', fs.createReadStream(__dirname + '/mock/public/UPLOAD ME'));
      form.append('files', fs.createReadStream(__dirname + '/mock/public/UPLOAD ME'));
    });

  });

  describe('getPath', function() {

    it('gets rid of dots in URL', function(cb) {
      request.get('http://localhost:8123/getPath/../../../index.html',
        function(err, res, body) {
          if (err) return cb(err);
          assert.equal(body, 'index.html');
          cb();
        });
    });

  });

});

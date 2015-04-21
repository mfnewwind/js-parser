'use strict';

/*jslint node: true */

var Fs = require('fs');
var Path = require('path');

var _ = require('lodash');
var acorn = require('acorn');

function JsParser() {
}

/**
 * ファイルのパースを行う
 */
JsParser.prototype.parseFile = function (path, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }
  
  var _this = this;
  Fs.readFile(path, function (err, data) {
    if (err) { return cb(err); }
    _this.parse(data.toString('utf8'), options, cb);
  });
};

/*
 * ソースコードのパースを行う
 */
JsParser.prototype.parse = function (source, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }
  
//  var ast = acorn.parse(source);
//  console.log(ast);
  
  cb(null, {});
};


module.exports = JsParser;
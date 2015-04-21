'use strict';

/*jslint node: true */

var Fs = require('fs');
var Path = require('path');

var _ = require('lodash');
var acorn = require('acorn');

var parseVariables = require('./variable');

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
  
  // ソースコードから AST (抽象構文木) に変換
  var ast = acorn.parse(source);
  
  // AST を識別子の種類別に解析
  var result = [];
  Array.prototype.push.apply(result, parseVariables(ast, options));
  
  cb(null, result);
};


module.exports = JsParser;
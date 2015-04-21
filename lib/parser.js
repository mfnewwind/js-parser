'use strict';

/*jslint node: true */

var Fs = require('fs');
var Path = require('path');

var _ = require('lodash');
var acorn = require('acorn');

var parseVariables = require('./variable');
var parseFunctions = require('./function');
var getLineNumber = require('./line-number');

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
  try {
    var ast = this.toAST(source);

    // AST を識別子の種類別に解析
    var results = [];
    Array.prototype.push.apply(results, parseVariables(ast, options));
    Array.prototype.push.apply(results, parseFunctions(ast, options));

    this._positionToLineNumber(source, results);
    cb(null, results);
  }
  
  // パースエラー
  catch (e) {
    cb(e);
  }
};

/*
 * 結果セットの文字数を行数に変換する
 */
JsParser.prototype._positionToLineNumber = function (source, results) {
  _.each(results, function (result) {
    result.line = getLineNumber(source, result.pos);
    delete result.pos;
  });
};

/*
 * ソースコードを AST に変換する
 */
JsParser.prototype.toAST = function (source) {
  return acorn.parse(source);
};

module.exports = JsParser;
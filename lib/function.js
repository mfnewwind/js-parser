'use strict';

/*jslint node: true */

var _ = require('lodash');
var walk = require('./walk');

var TYPE = 'variable';


// 関数名を解析する関数
function parseFunction(ast, options) {
  return walk(ast, walker);
}


function walker(ast) {
  switch (ast.type) {
  }
  
  return [];
}

module.exports = parseFunction;

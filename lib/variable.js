'use strict';

/*jslint node: true */

var _ = require('lodash');
var walk = require('./walk');

var TYPE = 'variable';


// 変数を解析する関数
function parseVariables(ast, options) {
  return walk(ast, visitor);
}


// 変数を再帰的に解析する関数
function visitor(ast) {
  switch (ast.type) {
    case 'VariableDeclarator':
      return [{
        type: TYPE,
        name: ast.id.name,
        pos: ast.id.start,
        start: ast.start,
        end: ast.end,
        class_name: '',
        comment: '' // とりあえず空
      }];
  }
  
  return [];
}


module.exports = parseVariables;
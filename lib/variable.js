'use strict';

/*jslint node: true */

var _ = require('lodash');

var walk = require('./walk');

var TYPE = 'variable';


// 変数を解析する関数
function parseVariables(ast, options) {
  return walk(ast, walker);
}


// 変数を再帰的に解析する関数
function walker(ast) {
  switch (ast.type) {
    case 'VariableDeclarator':
      return [{
        type: TYPE,
        name: ast.id.name,
        line: ast.start, // 行数ではなく文字数だが、とりあえず入れておく
        class_name: '',
        comment: '' // とりあえず空
      }];
  }
  
  return [];
}


module.exports = parseVariables;
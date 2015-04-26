'use strict';

/*jslint node: true */

var _ = require('lodash');
var walk = require('./walk');

var TYPE = 'function';


// 関数名を解析する関数
function parseFunctions(ast, options) {
  return walk(ast, visitor);
}


function visitor(ast) {
  switch (ast.type) {
    case 'FunctionDeclaration':
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


module.exports = parseFunctions;

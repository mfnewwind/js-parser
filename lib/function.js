'use strict';

/*jslint node: true */

var _ = require('lodash');
var walk = require('./walk');

var TYPE = 'function';


// 関数名を解析する関数
function parseFunctions(ast, options) {
  return walk(ast, walker);
}


function walker(ast) {
  switch (ast.type) {
    case 'FunctionDeclaration':
      return [{
        type: TYPE,
        name: ast.id.name,
        pos: ast.start,
        class_name: '',
        comment: '' // とりあえず空
      }];
  }
  
  return [];
}


module.exports = parseFunctions;

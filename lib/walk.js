'use strict';

/*jslint node: true */

var assert = require('assert');
var _ = require('lodash');

/**
 * AST を再帰的に巡回する関数 (WIP)
 * @param   ast     解析対象の AST
 * @param   visitor ノードごとの解析処理関数
 * @returns 解析結果の配列
 */
function walk(ast, visitor) {
  var result = [];
  
  assert(typeof visitor === 'function');
  
  // 結果セットに追加するヘルパー関数
  function pushResult(x) {
    if (_.isArray(x)) {
      Array.prototype.push.apply(result, x);
    }
    
    else {
      result.push(x);
    }
  }
  
  // ----------------------------------------------------------------
    
  if (!ast) {
    return [];
  }
  
  if (_.isArray(ast)) {
    _.each(ast, function (x) {
      pushResult(walk(x, visitor));
    });
  }
  
  switch(ast.type) {
    case 'Program':
      pushResult(walk(ast.body, visitor));
      break;
    
    case 'VariableDeclaration':
      pushResult(visitor(ast));
      
      _.each(ast.declarations, function (x) {
        pushResult(walk(x, visitor));
      });
      
      break;
    
    case 'VariableDeclarator':
      pushResult(visitor(ast));
      pushResult(visitor(ast.id));
      pushResult(visitor(ast.init));
      
      break;
  }
  
  return result;
}

module.exports = walk;
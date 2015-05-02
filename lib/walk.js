'use strict';

/*jslint node: true */

var assert = require('assert');
var _ = require('lodash');

/**
 * AST を再帰的に巡回する関数
 * @param   ast     解析対象の AST
 * @param   visitor ノードごとの解析処理関数
 * @returns 解析結果の配列
 */
function walk(ast, visitor) {
  var result = [];
  
  assert(typeof visitor === 'function');
  
  // 結果セットに追加するヘルパー関数
  function pushResult(items) {
    Array.prototype.push.apply(result, items);
  }
  
  // ----------------------------------------------------------------
    
  if (!ast) { return []; }
  
  // 配列の場合、子ノードをすべて巡回
  if (_.isArray(ast)) {
    _.each(ast, function (x) {
      pushResult(walk(x, visitor));
    });
    
    return result;
  }
  
  // 不正なノード
  if (!ast.type) { return []; }
  
  // 自身を巡回
  pushResult(visitor(ast));
  
  // 子ノードを巡回
  _.each(_.keys(ast), function (key) {
    if (_.isArray(ast[key]) ||
        ast[key] && ast[key].type)
    {
      pushResult(walk(ast[key], visitor));
    }
  });
  
  return result;
}

module.exports = walk;
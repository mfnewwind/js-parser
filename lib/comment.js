'use strict';

/*jslint node: true */

var _ = require('lodash');

/**
 * コメントを結合するか否か返す
 */
function isMergeComment(identity, comment) {
  // 同じ行
  if (identity.line === comment.line) { return true; }
  
  // 上の行
  if (identity.line - 1 === comment.end_line) { return true; }
  
  return false;
}

/**
 * コメントを識別子の情報に結合する処理
 * @param results 識別子解析結果
 * @param comment コメントの解析結果
 */
function mergeComments(results, comments) {
  _.each(results, function (result) {
    _.each(comments, function (comment) {
      if (isMergeComment(result, comment)) {
        result.comment = comment.value;
      }
    });
  });
}

module.exports = mergeComments;
'use strict';

/*jslint node: true */

var assert = require('assert');
var _ = require('lodash');

/**
 * テキスト中の文字のインデックスを行番号に変換する関数
 * @param text テキスト
 * @param pos  文字のインデックス
 */
function getLineNumber(text, pos) {
  assert(text);
  assert(text.length > pos);
  
  var line = 1, i = 0;
  
  while (i < pos) {
    // if LF
    if (text.charAt(i) === '\n') {
      ++line; ++i;
      continue;
    }
    
    // if CR or CR + LF
    if (text.charAt(i) === '\r') {
      // if CR + LF
      if (i + 1 < text.length && text.charAt(i + 1) === '\n') {
        ++i; // 次の LF の時にカウントする
      }
      
      // if CR
      else {
        ++line; ++i;
      }
      
      continue;
    }
    
    ++i;
  }
  
  return line;
}

module.exports = getLineNumber;

'use strict';

/*jslint node: true */

var assert = require('assert');
var _ = require('lodash');

function getLineNumber(text, pos) {
  assert(text);
  assert(text.length > pos);
  
  var line = 0, i = 0;
  
  while (i < pos) {
    // if LF
    if (text.charAt(i) === '\n') {
      ++line; ++i;
    }
    
    else if (text.charAt(i) === '\r') {
      // if CR + LF
      if (i + 1 < text.length && text.charAt(i + 1) === '\n') {
        ++i; // 次の LF の時にカウントする
      }
      
      // if CR
      else {
        ++line; ++i;
      }
    }
    
    else {
      ++i;
    }
  }
  
  return line;
}

module.exports = getLineNumber;

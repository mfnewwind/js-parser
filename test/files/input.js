/*globals console */

// テストで用いているため、容易に変更禁止

(function () {
  'use strict';
  
  function print(i) {
    var j = i;
    console.log(j);
  }
  
  var N = 10;
  for (var i = 0; i < N; ++i) {
    print(i);
  }
})();
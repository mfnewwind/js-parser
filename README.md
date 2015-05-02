js-parser
---------

[![Circle CI](https://circleci.com/gh/mfnewwind/js-parser/tree/master.svg?style=svg)](https://circleci.com/gh/mfnewwind/js-parser/tree/master)
[![Coverage Status](https://img.shields.io/coveralls/mfnewwind/js-parser/master.svg?style=flat-square)](https://coveralls.io/r/mfnewwind/js-parser?branch=master)

JavaScript の構文解析を行うライブラリです。

## Install

```sh
$ npm install git+https://github.com/mfnewwind/js-parser.git
```

## Usage

```javascript
var JsParser = require('js-parser');
var parser = new JsParser();

parser.parseFile('FILENAME', function (err, results) {
  if (err) {
    console.error('Error:', err);
    return;
  }
  
  console.log(results);
});
```

## Test

```sh
$ npm install
$ npm test
```

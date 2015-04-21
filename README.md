js-parser
---------

[![Circle CI](https://circleci.com/gh/mfnewwind/js-parser/tree/master.svg?style=svg)](https://circleci.com/gh/mfnewwind/js-parser/tree/master)

JavaScript の構文解析を行うライブラリです。

## Install

```sh
$ npm install git+https://github.com/mfnewwind/js-parser.git
```

## Usage

```sh
var JsParser = require('js-parser');
var parser = new JsParser();

parser.parseFile('FILENAME', function (err, results) {
  if (err) {
    console.error('Error: ', err);
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

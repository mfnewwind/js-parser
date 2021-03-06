js-parser
---------

[![Circle CI](https://img.shields.io/circleci/project/mfnewwind/js-parser/master.svg?style=flat-square)](https://circleci.com/gh/mfnewwind/js-parser/tree/master)
[![Coverage Status](https://img.shields.io/coveralls/mfnewwind/js-parser/master.svg?style=flat-square)](https://coveralls.io/r/mfnewwind/js-parser?branch=master)
[![Code Climate](https://img.shields.io/codeclimate/github/mfnewwind/js-parser/badges/gpa.svg?style=flat-square)](https://codeclimate.com/github/mfnewwind/js-parser)
[![Dependency Status](https://img.shields.io/david/mfnewwind/js-parser.svg?style=flat-square)](https://david-dm.org/mfnewwind/js-parser)
[![devDependency Status](https://img.shields.io/david/dev/mfnewwind/js-parser.svg?style=flat-square)](https://david-dm.org/mfnewwind/js-parser#info=devDependencies)

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

'use strict';

/*jslint node: true */
/*globals describe, it */

var _ = require('lodash');
var expect = require('chai').expect;

var JsParser = require('../lib/parser');

describe('Unit test for lib/parser.js', function () {
  describe('#constructor', function () {
    it('should create JsParser instance without errors', function () {
      expect(function () {
        new JsParser();
      }).to.not.throws();
    });
  });
});
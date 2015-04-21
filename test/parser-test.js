'use strict';

/*jslint node: true */
/*jslint -W030 */
/*globals describe, it, beforeEach, afterEach */


var Path = require('path');

var _ = require('lodash');
var expect = require('chai').expect;
var sinon = require('sinon');

var JsParser = require('../lib/parser');


var INPUT_PATH = Path.resolve(__dirname, 'files/input.js');
var SOURCE = 'var s = "Hello"; console.log(s);';


describe('Unit test for lib/parser.js', function () {
  var sandbox;
  
  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });
  
  afterEach(function () {
    sandbox.restore();
  });
  
  describe('#constructor', function () {
    it('should create JsParser instance without errors', function () {
      expect(function () {
        new JsParser();
      }).to.not.throws();
    });
  });
  
  describe('#parseFile', function () {
    it('should not throw to parse source file', function (done) {
      var parser = new JsParser();
      var parse = sandbox.stub(parser, "parse", function (source, options, cb) {
        expect(source).to.be.a('string');
        expect(options).to.be.an('object');
        expect(cb).to.be.a('function');
        
        cb(null, []);
      });
      
      parser.parseFile(INPUT_PATH, function (err, result) {
        expect(parse).to.have.been.calledOnce;
        expect(result).to.be.an('array');
        done(err);
      });
    });
  });
  
  describe('#parse', function () {
    it('should not throw to parse source', function (done) {
      var parser = new JsParser();
      
      parser.parse(SOURCE, function (err, result) {
        expect(result).to.be.an('array');
        done(err);
      });
    });
  });
});
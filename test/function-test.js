'use strict';

/*jslint node: true */
/*jslint -W030 */
/*globals describe, it, before, beforeEach, afterEach */


var _ = require('lodash');
var expect = require('chai').expect;
var sinon = require('sinon');


var JsParser = require('../lib/parser');
var parseFunctions = require('../lib/function');


describe('Unit test for lib/function.js', function () {
  var sandbox, parser;
  
  before(function () {
    parser = new JsParser();
  });
  
  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });
  
  afterEach(function () {
    sandbox.restore();
  });
  
  describe('parseFunctions', function () {
    it('should parse simple source', function () {
      var ast = parser.toAST('function name() { }');
      var results = parseFunctions(ast);
      
      expect(results).to.be.an('array');
      expect(results).to.have.length(1);
      expect(results[0]).to.have.property('type').that.is.string('function');
      expect(results[0]).to.have.property('name').that.is.string('name');
      expect(results[0]).to.have.property('class_name').that.is.string('');
      expect(results[0]).to.have.property('comment').that.is.a('string');
      expect(results[0]).to.have.property('pos').that.is.a('number');
    });
    
    it('should parse simple source (2 functions)', function () {
      var ast = parser.toAST('function name1() { } \n function name2() { }');
      var results = parseFunctions(ast);
      
      var names = _.pluck(results, 'name');
      expect(names).to.include('name1');
      expect(names).to.include('name2');
    });
  });
});
'use strict';

/*jslint node: true */
/*jslint -W030 */
/*globals describe, it, before, beforeEach, afterEach */


var Path = require('path');

var _ = require('lodash');
var expect = require('chai').expect;
var sinon = require('sinon');


var JsParser = require('../lib/parser');
var parseVariables = require('../lib/variable');


describe('Unit test for lib/variable.js', function () {
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
  
  describe('parseVariables', function () {
    it('should parse simple source', function () {
      var ast = parser.toAST('var name = "value";');
      var result = parseVariables(ast);
      
      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.have.property('type').that.is.string('variable');
      expect(result[0]).to.have.property('name').that.is.string('name');
      expect(result[0]).to.have.property('class_name').that.is.string('');
      expect(result[0]).to.have.property('comment').that.is.a('string');
      expect(result[0]).to.have.property('pos').that.is.a('number');
    });
    
    it('should parse simple source (2 variables)', function () {
      var ast = parser.toAST('var name1 = "value", name2 = 1;');
      var result = parseVariables(ast);
      
      expect(result).to.be.an('array');
      expect(result).to.have.length(2);
      
      var names = _.pluck(result, 'name');
      expect(names).to.include('name1');
      expect(names).to.include('name2');
    });
  });
});

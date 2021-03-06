'use strict';

/*jslint node: true */
/*jslint -W030 */
/*globals describe, it, beforeEach, afterEach */


var Path = require('path');

var _ = require('lodash');
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var JsParser = require('../lib/parser');


var expect = chai.expect;
chai.use(sinonChai);

var INPUT_PATH = Path.resolve(__dirname, 'files/input.js');
var SOURCE = 'var s = "Hello"; console.log(s);';
var INVALID_SOURCE = 'varx s = "Hello; console.log((s)';


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
    
    it('should not throw to parse source file', function (done) {
      var parser = new JsParser();
      
      parser.parseFile(INPUT_PATH, function (err, results) {
        try {
          expect(err).to.not.be.ok;
          
          console.log(results);
          
          var variable_j = _.find(results, function (x) { return x.name === 'j'; });
          expect(variable_j).to.deep.equal({
            type: 'variable',
            name: 'j',
            line: 9,
            start_line: 9,
            end_line: 9,
            class_name: '',
            comment: 'comment'
          });
          
          var func_print = _.find(results, function (x) { return x.name === 'print'; });
          expect(func_print).to.deep.equal({
            type: 'function',
            name: 'print',
            line: 8,
            start_line: 8,
            end_line: 11,
            class_name: '',
            comment: ''
          });

          done();
        }
        
        catch (e) {
          done(e);
        }
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
    
    it('should return some errors because syntax is invalid', function (done) {
      var parser = new JsParser();
      
      parser.parse(INVALID_SOURCE, function (err, result) {
        expect(err).to.be.ok;
        done();
      });
    });
  });
  
  describe('#_positionToLineNumber', function () {
    it('should convert `pos` to `line`', function () {
      var parser = new JsParser();
      
      var source = 'var a = 0;\nvar b = 1;';
      var results = [
        {
          type: 'variable',
          name: 'a',
          class_name: '',
          comment: '',
          pos: 4
        },
        {
          type: 'variable',
          name: 'b',
          class_name: '',
          comment: '',
          pos: 15
        }
      ];
      
      parser._positionToLineNumber(source, results);
      
      expect(results[0].line).to.equal(1);
      expect(results[1].line).to.equal(2);
    });
  });
  
  describe('#toAST', function () {
    it('should get source comments', function () {
      var parser = new JsParser();
      
      var source = 'var a = 0; // comment';
      var comments = [];
      var ast = parser.toAST(source, comments);
      
      expect(comments).to.have.length(1);
      expect(comments[0]).to.have.property('value').that.include('comment');
    });
    
    it('should get source block comments', function () {
      var parser = new JsParser();
      
      var source = '/**\n * This is a block comment\n */\nvar a = 0;';
      var comments = [];
      var ast = parser.toAST(source, comments);
      
      expect(comments).to.have.length(1);
      expect(comments[0]).to.have.property('value').that.include('This is a block comment');
    });
  });
  
  describe('#_commentsToLineNumber', function () {
    it('should convert comments', function () {
      var parser = new JsParser();
      
      var source = 'var a = 0; // comment';
      var comments = [];
      var ast = parser.toAST(source, comments);
      parser._commentsToLineNumber(source, comments);
      
      expect(comments).to.have.length(1);
      expect(comments[0]).to.have.property('line').that.is.a('number');
      expect(comments[0]).to.have.property('start_line').that.is.a('number');
      expect(comments[0]).to.have.property('end_line').that.is.a('number');
    });
  });
});
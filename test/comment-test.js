'use strict';

/*jslint node: true */
/*jslint -W030 */
/*globals describe, it, before, beforeEach, afterEach */


var _ = require('lodash');
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var mergeComments = require('../lib/comment');

var expect = chai.expect;
chai.use(sinonChai);


describe('Unit test for lib/comment.js', function () {
  describe('mergeComments', function () {
    it('should merge identities and comments', function () {
      var identities = [{ type: 'variable', name: 'var_name', class_name: '', line: 10 }];
      var comments = [{ value: 'comment', line: 10 }];
      
      mergeComments(identities, comments);
      expect(identities[0]).to.have.property('comment').that.equal('comment');
    });
    
    it('should merge identities and comments (not same line)', function () {
      var identities = [{ type: 'variable', name: 'var_name', class_name: '', line: 10 }];
      var comments = [{ value: 'comment', line: 9, start_line: 9, end_line: 9 }];
      
      mergeComments(identities, comments);
      expect(identities[0]).to.have.property('comment').that.equal('comment');
    });
  });
});
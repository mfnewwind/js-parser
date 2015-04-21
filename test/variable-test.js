'use strict';

/*jslint node: true */
/*jslint -W030 */
/*globals describe, it, beforeEach, afterEach */


var Path = require('path');

var _ = require('lodash');
var expect = require('chai').expect;
var sinon = require('sinon');

var parseVariables = require('../lib/variable');


describe('Unit test for lib/variable.js', function () {
  var sandbox;
  
  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });
  
  afterEach(function () {
    sandbox.restore();
  });
  
  it('parseVariables');
});

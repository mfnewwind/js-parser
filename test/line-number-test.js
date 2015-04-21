'use strict';

/*jslint node: true */
/*jslint -W030 */
/*globals describe, it, beforeEach, afterEach */

var expect = require('chai').expect;

var getLineNumber = require('../lib/line-number');

describe('Unit test for lib/line-number.js', function () {
  describe('getLineNumber', function () {
    describe('LF only', function () {
      it('should return 0', function () {
        expect(getLineNumber('0\n2', 0)).to.equal(1);
      });

      it('should return 0', function () {
        expect(getLineNumber('0\n2', 1)).to.equal(1);
      });

      it('should return 1', function () {
        expect(getLineNumber('0\n2', 2)).to.equal(2);
      });

      it('should return 2', function () {
        expect(getLineNumber('\n\n2', 2)).to.equal(3);
      });
    });
    
    
    describe('CR only', function () {
      it('should return 0', function () {
        expect(getLineNumber('0\r2', 0)).to.equal(1);
      });

      it('should return 0', function () {
        expect(getLineNumber('0\r2', 1)).to.equal(1);
      });

      it('should return 1', function () {
        expect(getLineNumber('0\r2', 2)).to.equal(2);
      });

      it('should return 2', function () {
        expect(getLineNumber('\r\r2', 2)).to.equal(3);
      });
    });
    
    describe('CR + LF', function () {
      it('should return 0', function () {
        expect(getLineNumber('0\r\n2', 0)).to.equal(1);
      });

      it('should return 0', function () {
        expect(getLineNumber('0\r\n2', 1)).to.equal(1);
      });
      
      it('should return 0', function () {
        expect(getLineNumber('0\r\n2', 2)).to.equal(1);
      });

      it('should return 1', function () {
        expect(getLineNumber('0\r\n2', 3)).to.equal(2);
      });

      it('should return 2', function () {
        expect(getLineNumber('\r\n\r\n2', 4)).to.equal(3);
      });
    });
    
  });
});
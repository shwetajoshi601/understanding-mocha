var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should();
var client = require('../client.js');
var testData = require('./test-config.json').client;

describe('Client Test Cases', function () {

        before(function () {
            console.log("---------in before---------");
            if (!testData.URL) {
                this.skip();
            }
        });

        after(function () {
             console.log("---------in after---------");
        });

        afterEach(function () {
             console.log("---------in afterEach---------");
        });

        beforeEach(function () {
             console.log("---------in beforeEach---------");
        });

    describe('#SUCCESS', function () {

        it('Case to list users successfully - using expect', function (done) {
            console.log("--------TC-1----------");
            client.listUsers(testData.URL, testData.token, function (err, res) {
                //console.log("\n\n----------err-------------");
                // console.log(err);
                expect(err).to.be.null;
                expect(res).to.be.not.null;
                expect(res.statusCode).to.equal(200);
                expect(Array.isArray(res.body)).to.equal(true);
                done();
            });
        });

        it('Case to list users successfully - using should', function (done) {
            console.log("--------TC-2----------");
            client.listUsers(testData.URL, testData.token, function (err, res) {

                //err.should.be.null; -- ERROR - cannot read property should of null
                should.equal(err, null);
                should.not.exist(err);
                res.should.be.not.null;
                res.statusCode.should.equal(200);
                Array.isArray(res.body).should.equal(true);
                done();
            });
        });

        it('Case to list users successfully - using assert', function (done) {
            console.log("--------TC-3----------");
            client.listUsers(testData.URL, testData.token, function (err, res) {
                assert.isNull(err, 'Expected err to be null, but its not null');
                assert.isNotNull(res, 'Expected non-null response, but got null');
                assert.isArray(res.body, 'Expected res.body to be Array but got' + typeof res.body);
                assert.equal(res.body[0].id,"G7P21P5C5","ERROR");
                done();
            });
        });
    });

    describe('#FAILURE', function () {
        it('Case to get error for invalid URL', function (done) {
            console.log("--------TC-4----------");
            client.listUsers("invalid", testData.token, function (err, res) {
                //expect(err.statusCode).to.equal(400);
                assert.isNotNull(err, 'Expected error, but got null');
                assert.equal(err.statusCode, 500, 'Expected statusCode 500 but got ' + err.statusCode);
                assert.equal(err.error, 'unknown_method', 'Expected error unknown_method but got ' + err.error);
                done();
            });
        });
    });
});
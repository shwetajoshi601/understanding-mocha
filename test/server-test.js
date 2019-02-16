var request = require('request');
var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should();
var testData = require('./test-config.json').server;

describe('Server Test Cases', function () {
    before(function () {
        if (!(testData.URL && testData.token)) {
            this.skip();
        }
    });

    after(function(){

    });

    it('#Success Case', function (done) {
        var req = {
            url: testData.URL,
            method: 'POST',
            body: {
                'text': "Hieeee",
                'channel': 'D7P4W5L9F',
                'token': testData.token
            },
            json: true
        }
        request(req, function (err, res) {
            console.log("\n\n\n************ err- res **************");
            console.log(err);
            console.log(res.body);
            assert.isNull(err, 'Expected err to be null, but its not null');
            assert.isNotNull(res, 'Expected non-null response, but got null');
            assert.equal(res.statusCode, 200, 'Expected status 200 but got ' + res.statusCode);
            assert.property(res.body.message, 'username', 'Property username is missing from response');
            done();
        });
    });

    it('#Error Case - mandatory field missing', function (done) {
        var req = {
            url: testData.URL,
            method: 'POST',
            body: {
                'text': "Hieeee",
                'token': testData.token
            },
            json: true
        }
        request(req, function (err, res) {
            console.log("\n\n\n************ err- res **************");
            console.log(err);
            console.log(res.body);
            assert.isNotNull(res, 'Expected non-null response, but got null');
            assert.equal(res.statusCode, 400, 'Expected status 400 but got ' + res.statusCode);
            assert.equal(res.body.error, 'Mandatory field missing', 'Expected mandatory field missing error but got '+res.body);
            done();
        });
    });
});
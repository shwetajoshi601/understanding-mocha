var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should();
var httpMocks = require("node-mocks-http");
var routeHandler = require("../../routes/routeHandlers.js");
var mockery = require('mockery');
var sinon = require('sinon');
//var nock = require('nock');
mockery.enable({
    warnOnReplace: false,
    warnOnUnregistered: false,
    useCleanCache: true
});
var requestStub = sinon.stub();	
/*requestStub.RetryStrategies = {
    HTTPOrNetworkError: 'testStrategy'
};*/			//create an anonymous stub
mockery.registerMock('request', requestStub);
var count = 0;

describe('# SERVER TEST CASES', function () {

    after(function(){
        mockery.disable();
    });
    it("Should post a message successfully", function (done) {

        requestStub.onCall(count++).yields(null, {		//provide fake response
            "statusCode": 200,
            "body": {
                "ok": true,
                "channel": "D7P4W5L9F",
                "ts": "1510215690.000117",
                "message": {
                    "text": "ちょっと冷たいここに！",
                    "username": "rita_iwb",
                    "icons": {
                        "emoji": "https://emoji.slack-edge.com/T7P529ASJ/squirrel/465f40c0e0.png"
                    },
                    "bot_id": "B7NASKZRQ",
                    "type": "my_dummy_message",
                    "subtype": "bot_message",
                    "ts": "1510215690.000117"
                }
            }
        });

        var mockRequest = httpMocks.createRequest({
            method: "POST",
            url: "/api/posttoslack",
            body: {
                "channel": "D7P4W5L9F",
                "text": "Hieeee!!!!!!!!!!!!!!!",
                "token": "xoxp-261172316902-259635289776-260419841860-3c280103d3e9e3fa4209bd8ee2556726"
            }
        });
        var mockResponse = httpMocks.createResponse();
        //console.log("\n\n---------------mockResponse----------------");
        //console.log(mockResponse);
        routeHandler.routeHandler(mockRequest, mockResponse);
        const actualResponseBody = mockResponse._getData();
        console.log("\n\n---------------actualResponseBody----------------");
        console.log(actualResponseBody);
        //expect(actualResponseBody.message).to.exist;
        //const expectedResponseBody = ;
       // assert(actualResponseBody, expectedResponseBody);
       done();
    });

});
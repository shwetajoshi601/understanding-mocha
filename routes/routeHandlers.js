var request = require('request');
//var request = require('requestretry');

function routeHandler(req, res) {
    console.log("\n\n----------SLACK API----------");
    console.log(req.body);
    if (!(req.body && req.body.token && req.body.channel && req.body.text)) {
        res.status(400);
        res.json({ statusCode: 400, error: "Mandatory field missing" });
    }

    var req = {
        url: 'https://slack.com/api/chat.postMessage',
        method: 'POST',
        headers:
        {
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        },
        formData:
        {
            token: req.body.token,
            channel: req.body.channel,
            text: req.body.text
        }
    }
    request(req, function (err, resp) {
        console.log("\n\n---------in callback---------");
        try {
            if (err) {
                err = typeof err === 'string' ? JSON.parse(err) : err;
                res.status(500);
                res.json({
                    statusCode: 500,
                    error: err
                });
            } else {
                var resBody = typeof resp.body === 'string' ? JSON.parse(resp.body) : resp.body;
                if (!resBody.ok) {
                    // console.log("---------error---------");
                    // console.log(resBody);
                    res.status(500);
                    res.json({
                        statusCode: 500,
                        error: resBody.error
                    });
                } else {
                     console.log("\n\n---------respBody in server---------");
                     console.log(resBody);
                    res.status(200);
                    res.json({ statusCode: 200, message: resBody.message });
                }
            }
        } catch (ex) {
            res.status(500);
            res.json({
                statusCode: 500,
                error: ex
            })
        }
    });

    //res.send(200,"Hello world");
};

module.exports = {
    routeHandler : routeHandler
};
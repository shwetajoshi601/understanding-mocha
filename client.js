var request = require('request');
var constant = require('./constant.json');

function formRequestObject(url, method, token,data) {
    var req = {
        url: constant.baseURL + url,
        method: method,
        headers: {
            'content-type': 'multipart/form-data'
        },
        formData: { token: token }
    }

    return req;
}

function listGroups(func,token,callback) {
    var req = formRequestObject(constant.URLMap[func], 'POST',token);

    request(req, function (err, res) {
        try {
            if (err) {
                err = typeof err === 'string' ? JSON.parse(err) : err;
                callback({
                    statusCode: 500,
                    error: err
                });
            } else {
                var resBody = typeof res.body === 'string' ? JSON.parse(res.body) : res.body;
                if (!resBody.ok) {
                   // console.log("---------error---------");
                   // console.log(resBody);
                    callback({
                        statusCode: 500,
                        error: resBody.error
                    });
                } else {
                    callback(null, {statusCode: 200, body: resBody.groups});
                }
            }
        } catch (ex) {
            callback({
                statusCode: 500,
                error: ex
            })
        }
    });
}


listGroups('listGroups','your_token',function (err, res) {
    console.log(err);
    console.log(res);
});

exports.listGroups = listGroups;
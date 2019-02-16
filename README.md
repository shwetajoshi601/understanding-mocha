- [Testing using Mocha](#testing-using-mocha)
  * [Client](#client)
        * [Note:](#note-)
        * [Running Mocha Test Cases](#running-mocha-test-cases)
  * [Server](#server)
        * [Running Mocha Test Cases](#running-mocha-test-cases-1)
  * [Additional Mocha commands](#additional-mocha-commands)

# Testing using Mocha

This application demonstrates the use of Mocha Framework for writing Integration Test Cases for client and server Node .JS applications.

Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. This application also uses Chai assertion library for asserting the results.

More Details: [Mocha](https://mochajs.org/) , [Chai](http://chaijs.com/api/)

To get started with the application, clone this folder and install the dependencies using the command:

```
npm install
```

## Client

The file client.js contains a method "listGroups". This method expects a function which has value 'listGroups', a token which refers to your Slack account OAuth token, and a callback function to handle the response from the Slack API.

##### Note: 
* To know more about Slack APIs refer- [Slack API](https://api.slack.com/methods/groups.list)
* To know more about Slack OAuth refer - [Using Oauth](https://api.slack.com/docs/oauth)

To run this file, in client.js, change the string 'your_token' with your own Slack account oauth token in the function call.

Example: 
```
listGroups('listGroups','xoxo-hfbdflhf;qjfojqr76875485703',function (err, res) {
    console.log(err);
    console.log(res);
});
```
Then execute the command:

```
node client.js
```

##### Running Mocha Test Cases
The test cases for this function are located in the folder: test/test-client.js
A config file in 'test' folder 'test-config.json' is read by the test file for input to be given to the function.
In this file, give your oauth token in: 

```
"client":{
	"token":"your_token"
}
```

To run the Mocha test cases execute the command:

```
npm run test-client
```

This will show you the test results and also generate the test reports using "mochawesome" report generator. You can check your reports in the folder 'reports' > 'client'. Open the file mochawesome.html in the browser.

To know more about mochawesome refer - [mochawesome](https://www.npmjs.com/package/mochawesome)

## Server

The server.js file is an express server application that exposes an API '/api/posttoslack' which posts messages to a Slack channel. 

To start the server:
```
node server.js
```

The server will be listening on port 3000 on localhost.

To send a request to the API /posttoslack, use Postman and send a request in the following format:

```
Method : POST
url : http://localhost:3000/api/posttoslack
body : {
	"channel":"slack_channel_id",
	"text":"Some text to be posted on the Slack channel",
	"token":"your_slack_oauth_token"
}
```

You will get a 200 OK if the request is successfull.

##### Running Mocha Test Cases
The test cases for this application are located in the folder: test/test-server.js
In test/test-config.json, give your Server URL & oauth token in: 

```
"server":{
        "URL":"http://your_server_url:port/api/posttoslack",
        "token" : "your_token"
		}
```

Example: 
```
"server" : {
	"URL":"http://localhost:3000/api/posttoslack",
    "token":"xoxo-jhwfihjpojufncjn25237876387297"
}
```
To run the Mocha test cases execute the command:

```
npm run test-server
```

The test report will be generated in the folder 'reports' > 'server'

## Additional Mocha commands

* Test Cases can also be run using the command : 
```
mocha test/client-test.js --reporter mochawesome --reporter-options reportDir=reports/client
```

* To run the test cases without generating reports:
```
mocha test/client-test.js
```

* To run the test cases with timeout for each test case:
```
mocha test/client-test.js -t 30000
```

* To run the test cases for Client & Server together:
```
npm test
```

Note: Refer to the "scripts" section of package.json file. It specifies the scripts that run on specific commands. For example, "test" has a command associated with it. When you execute npm test, it maps to the command specified in package.json.

# Additional Information
To know more about Mocha and it's usage refer to the .docx file /docs folder of this repository.
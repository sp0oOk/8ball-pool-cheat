
const request = require('request');

let username = "spooky";
let email = "spooky@test.ac";
let password = "spooky";
let authorized = 1;

//let requestBody = [username, email, password, authorized];
//let route = 'users';

let requestBody = [email, password, authorized, '8bpgl'];
let route = 'auth';

let requestOptions = {
    url: 'https://idbots.xyz/api/' + route,
    method: 'POST',
    gzip: true,
    headers: { 'Content-Type': 'application/json' },
    json: true,
    body: requestBody,
  }
request.post(requestOptions, function (error, response, body) {
    console.log(body);
});

// HURRAY NOW WE ENTER STAGE 4
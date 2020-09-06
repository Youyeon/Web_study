var http = require('http');
var cookie = require('cookie');
http.createServer(function(request, response) {
    var cookies = {};
    if (request.headers.cookie !== undefined) {
        var cookies = cookie.parse(request.headers.cookie);
    }
    response.writeHead(200, {
        'Set-Cookie':['yummy_cookie=choco', 'tasty_cookie=strawberry']
    });
    response.end('Cookie!');
}).listen(3000);
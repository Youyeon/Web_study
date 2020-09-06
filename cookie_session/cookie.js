var http = require('http');
var cookie = require('cookie');
http.createServer(function(request, response) {
    var cookies = {};
    if (request.headers.cookie !== undefined) {
        var cookies = cookie.parse(request.headers.cookie);
    }
    response.writeHead(200, {
        'Set-Cookie':['yummy_cookie=choco', 
        'tasty_cookie=strawberry',
        `Permanent=cookies; Max-Age=${60*60*24*30}`, //cookie expired time set, unit=second
        'Secure=Secure; Secure', //뒤의 Secure: 웹이 https로 통신할 때만 쿠키 생성
        'HttpOnly=HttpOnly; HttpOnly', //JavaScript를 이용한 침해 방지
        'Path=Path; Path=/cookie', //cookie path 
        'Domain=Domain; Domain=o2.org' //cookie domain: 별도 설정 필요
        ]
    }); 
    response.end('Cookie!');
}).listen(3000);
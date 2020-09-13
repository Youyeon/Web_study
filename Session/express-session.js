var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session') //middleware
var FileStore = require('session-file-store')(session)

var app = express()

//app.use(): 사용자의 요청마다 괄호 안을 호출
app.use(session({ //session 객체 생성
    secret: 'keyboard cat', //used to sign the session ID cookie
    resave: false, //false: session data가 생기기 전까진 저장소에 session을 저장하지 않음 true: session 변동에 상관없이 저장소에 저장
    saveUninitialized: true, //session이 필요하기 전까지 session 구동x
    store: new FileStore()
}))

app.get('/', function(req, res, next) {
    if(req.session.num === undefined) {
        req.session.num = 1;
    } else {
        req.session.num += 1;
    }
    res.send(`Views : ${req.session.num}`)
})

app.listen(3000,function() {
    console.log('3000!');
})
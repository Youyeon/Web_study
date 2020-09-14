var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet')
app.use(helmet());
var session = require('express-session')
var FileStore = require('session-file-store')(session)
var flash = require('connect-flash');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(session({
  secret: 'asadlfkj!@#!@#dfgasdg',
  resave: false,
  saveUninitialized: true,
  store:new FileStore()
}))
app.use(flash()); //내부에서 session 사용 -> session 활성화 이후 코드

var authData = {
  email: 'egoing777@gmail.com',
  password: '111111',
  nickname: 'egoing'
};

/*passport*/
var passport = require('passport') //내부에서 session을 사용하기에 session 활성화 이후에 코드 작성 해야함
  , LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize()); //middleware 설치
app.use(passport.session());

passport.serializeUser(function(user, done) {
  //user 변수에는 done 함수의 user 매개변수값이 저장됨
  done(null, user.email); //2번째 인자로는 식별자
});
passport.deserializeUser(function(id, done) {
  // 로그인이 됐을 때, 페이지 방문마다 호출되는 부분
  done(null, authData);
});

passport.use(new LocalStrategy( {
  usernameField: 'email',
  passwordField: 'pwd'
},
  function(username, password, done) {
    if(username === authData.email) {
      if(password === authData.password) {
        return done(null, authData, {
          message: 'Welcome.'
        });
      } else {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
    } else {
      return done(null, false, {
        message: 'Incorrect username.'
      });
    }
  }
));

app.post('/auth/login_process',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true,
    successFlash: true
  })
);

/*passport end*/

app.get('*', function(request, response, next){
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next();
  });
});

var indexRouter = require('./routes/index');
var topicRouter = require('./routes/topic');
var authRouter = require('./routes/auth');

app.use('/', indexRouter);
app.use('/topic', topicRouter);
app.use('/auth', authRouter);

app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});

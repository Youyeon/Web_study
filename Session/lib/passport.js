 module.exports = function(app) {
    var authData = {
        email: 'egoing777@gmail.com',
        password: '111111',
        nickname: 'egoing'
      };
      
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
    return passport;
}

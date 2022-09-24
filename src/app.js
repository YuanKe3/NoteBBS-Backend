var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var myRouter = require('./routes/my');

// 用于将 JWT 字符串解析还原成 json 对象
const { expressjwt } = require('express-jwt');
const { TOKEN_KEY } = require('./conf/secretKeys');
const { ErrorModel } = require('./model/resModel');

var app = express();
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, '../', 'public')))
app.use('/uploads', express.static(path.join(__dirname, '../', 'uploads')))

// 对登录、注册页就不需要进行 token 的解密了,防止发现 token
app.use(expressjwt({ secret: TOKEN_KEY, algorithms: ['HS256'] }).unless({
  path: [
    /^\/api\//,
    // 静态页面无需权限即可访问
    /^\/uploads\//,
    /^\/public\//
  ]
}))


app.use('/', indexRouter);
app.use('/api/user', usersRouter);
app.use('/my', myRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json(new ErrorModel({
      errno: -1,
      message: '无效的 token',
      status: 401
    }))
  }

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var wechat = require('wechat');
var config = {
  token: 'bf2065d5b55301df603fb3386bc1e7a1',
  appid: 'wx402af42727f4fca1',
  // encodingAESKey: 'encodinAESKey',
  checkSignature: false // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false
};
var axios = require('axios');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/wechat', wechat(config.token, function (req, res, next) {
  // 微信输入信息都在req.weixin上
  var message = req.weixin;
  var openId = message.FromUserName;
  console.log(message);

  if (message.Content == 'key') {
    res.reply('關鍵字觸發');
  }
  else if (message.MsgType == 'image') {
    res.reply({
      type: "image",
      content: {
        mediaId: 'vEUA93tZUeI1w0W45Fe4_bHSJeoZ8hwnoILoGXjZWeLDeGAlQIB38Yj8RnL7Lo4v'
      }
    });
  }
  else {
    res.reply(message.Content);
    // var msgBody = {
    //   "query": '刘德华',
    //   "city": "北京",
    //   "category": "movie",
    //   "appid": "wx402af42727f4fca1",
    //   "uid": message.OpenId

    // }
    // var access_token = '12_tC6gmBuKub8OdAMMstVwnNnI7gDLdVu1_9DCqAuyQi39gq2DNJlEHTF9CEGP7IDt3NKe9oBxLCeHzk1JR2nyxSYIifnyTFx5w1HQ9IsinE8QN134sPxX4OjWCiIpAWHeMad5GQ7b5WZexlAiFLGjAHAKQL';
    // var queryUrl = 'https://api.weixin.qq.com/semantic/semproxy/search?access_token=';
    // axios.post(queryUrl + access_token, msgBody)
    //   .then(function (response) {

    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.log("Error----");
    //     console.log(error);
    //   });
  }


}));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

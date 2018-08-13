var express = require('express');
var router = express.Router();

var axios = require('axios');

var config = require('../Config/Setting');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sendMsg', function (req, res, next) {

  var msgBody = req.body.data;
  console.log(msgBody);

  var apiUrl = 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=';

  axios.post(apiUrl + config.access_token, msgBody)
    .then(function (response) {

      console.log(response);
    })
    .catch(function (error) {
      console.log("Error----");
      console.log(error);
    });
});

router.get('/oauth', function (req, res, next) {
  res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appId + '&redirect_uri=' + config.redirect_url + '&response_type=code&scope=snsapi_base&state=martin#wechat_redirect');
});

router.get('/oauthPage', function (req, res, next) {
  var code = req.query.code;

  axios.get("https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + config.appId + "&secret=" + config.appsecret + "&code=" + code + "&grant_type=authorization_code")
    .then(function (response) {
      // console.log(response.data);
      var openid = response.data.openid;
      res.render('oauthPage', { title: openid });
    });

});

router.get('/jsPage', function (req, res, next) {
  res.render('jsSDKPage');
});

router.get('/jsapi_ticket', function (req, res, next) {
  var url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + config.access_token + "&type=jsapi";
  axios.get(url)
    .then(function (response) {
      console.log(response.data);
      res.send(response.data);
    });
});

module.exports = router;


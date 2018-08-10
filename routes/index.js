var express = require('express');
var router = express.Router();

var axios = require('axios');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sendMsg', function (req, res, next) {

  var msgBody = req.body.data;
  console.log(msgBody);

  var apiUrl = 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=';
  var access_token = '12_U9smTTBwFPtkGyiRGX-5DYW5B0dZs523w_ooFrUHQ2de-vnzx7adMR2Yo_6r8M6QCrAjwi7dVAUuP1L4ePNM5zbZa2i6OutMs0K1h_qodiK037RZtv2nxaJNXvgBNBiAFAIUI';
  axios.post(apiUrl + access_token, msgBody)
    .then(function (response) {

      console.log(response);
    })
    .catch(function (error) {
      console.log("Error----");
      console.log(error);
    });
});

router.get('/oauth', function (req, res, next) {
  res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx402af42727f4fca1&redirect_uri=https://c1dc6a76.ngrok.io/oauthPage&response_type=code&scope=snsapi_base&state=martin#wechat_redirect');
});

router.get('/oauthPage', function (req, res, next) {
  var code = req.query.code;

  axios.get("https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx402af42727f4fca1&secret=bf2065d5b55301df603fb3386bc1e7a1&code=" + code + "&grant_type=authorization_code")
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
  var ACCESS_TOKEN = '12_eSdJj2Xsa64wZllvL1pVtB4F0AtqKco3aqCJ02yjUB2J8tgfADDD15YByQpP_n-XBApbog9T0nsNp9QK6-I67DjfAmpDuy9cyx5AC-glSp6tMti6ux5qwBL7SPQGYINTnGOJmq6oSIMgQen0QGGaAEAVLL';
  var url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + ACCESS_TOKEN + "&type=jsapi";
  axios.get(url)
    .then(function (response) {
      console.log(response.data);
      res.send(response.data);
    });
});

module.exports = router;


// require('../config/passportTwitter')(passport)
var express = require('express');
var router = express.Router();
const passport = require('passport');
var jwt = require('jsonwebtoken');
// const passport = require('../config/passportTwitter')

var key = require('../config/keys')
var request = require('request');


var createToken = function(auth) {
    return jwt.sign({
      id: auth.id
    },key.secret,
    {
      expiresIn: 8*7*24*60*60*1000
    });
  };

var generateToken = function (req, res, next) {
    var token = createToken(req.user);
    res.json({ success: 1, token: 'JWT ' + token, user:req.user });};

var sendToken = function (req, res) {
    res.setHeader('x-auth-token', req.token);
    return res.status(200).send(JSON.stringify(req.user));
};


router.post('/auth/twitter/reverse', function (req, res) {
  


    var qs = require('querystring')
        , oauth =
        {
            callback: "http://localhost:3000/emailvarify"
            , consumer_key: key.twitter.key,
            consumer_secret: key.twitter.secret
        }
        , url = 'https://api.twitter.com/oauth/request_token'
        ;
    request.post({ url: url, oauth: oauth }, function (err, r, body) {

        if (err) {
            return res.send(500, { message: err.message });
        }
        var jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
        res.send(JSON.parse(jsonStr));
    })
})




var twitterhandle = null





router.post('/auth/twitter/', function (req, res, next) {
  
        request.post({
            url: 'https://api.twitter.com/oauth/access_token',
            oauth: {
                 consumer_key: key.twitter.key,
                consumer_secret: key.twitter.secret,
                token: req.query.oauth_token
            },
            form: { oauth_verifier: req.query.oauth_verifier }
        }, function (err, r, body) {
            if (err) {
                return res.status(500).send({ message: err.message });
            }
            const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
            const parsedBody = JSON.parse(bodyString);

            req.body['oauth_token'] = parsedBody.oauth_token;
            req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
            req.body['user_id'] = parsedBody.user_id;



            next();
        })
},  passport.authenticate('twitter-token'), function (req, res, next) {
    if (!req.user) {
        return res.send(401, 'User Not Authenticated');
    }

    // prepare token for API
    req.auth = {
        id: req.user.id,
        email: req.user.email,
        profilepic: req.user.profilepic,
        username: req.user.username,
        data: req.user.date,
        payment: req.user.payment,
    };

    return next();
}, generateToken, sendToken)



router.post('/visit/auth/twitter/reverse/:twitterhandle', function (req, res) {
    twitterhandle = req.params.twitterhandle
   
    var qs = require('querystring')
        , oauth =
        {
            callback: "http://localhost:3000"
            , consumer_key: key.twitter.key,
            consumer_secret: key.twitter.secret
        }
        , url = 'https://api.twitter.com/oauth/request_token'
        ;
    request.post({ url: url, oauth: oauth }, function (err, r, body) {

        if (err) {
            return res.send(500, { message: err.message });
        }
        var jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
        res.send(JSON.parse(jsonStr));
    })
})


router.post('/visit/auth/twitter/', function (req, res, next) {
  
        request.post({
            url: 'https://api.twitter.com/oauth/access_token',
            oauth: {
                 consumer_key: key.twitter.key,
                consumer_secret: key.twitter.secret,
                token: req.query.oauth_token
            },
            form: { oauth_verifier: req.query.oauth_verifier }
        }, function (err, r, body) {
            if (err) {
                return res.status(500).send({ message: err.message });
            }
            const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
            const parsedBody = JSON.parse(bodyString);

            req.body['oauth_token'] = parsedBody.oauth_token;
            req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
            req.body['user_id'] = parsedBody.user_id;



            next();
        })
},  passport.authenticate('twitter-token'), function (req, res, next) {
    if (!req.user) {
        return res.send(401, 'User Not Authenticated');
    }

    // prepare token for API
    req.auth = {
        id: req.user.id,
        email: req.user.email,
        profilepic: req.user.profilepic,
        username: req.user.username,
        data: req.user.date,
        payment: req.user.payment,
    };

    return next();
}, generateToken, sendToken)


module.exports = router;

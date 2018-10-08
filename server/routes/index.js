(function() {

  'use strict';
  var express = require('express');
    var mysql = require('mysql');
    var AWS = require('aws-sdk');
    var colors = require('colors');
  var router = express.Router(); 
    
var auth = {};
    var conf = {};
    var sess={};
var userObj = {};    
    
    
var AWSCognito = require('amazon-cognito-identity-js');
function authenticateUser(username, password){
    //var userObj = {};
    
    var CognitoUserPool = AWSCognito.CognitoUserPool;
    global.navigator = () => null;
    var authenticationData = {
        Username : username,
        Password : password,
    };
    var authenticationDetails = new AWSCognito.AuthenticationDetails(authenticationData);
    
    var poolData = {
        UserPoolId : 'us-east-2_JUZbvaXEG', // Your user pool id here
        ClientId : '2kh7bg97t4gpmasbu7rs341khn' // Your client id here
    };
    
    var userPool = new AWSCognito.CognitoUserPool(poolData);
    var userData = {
        Username : username,
        Pool : userPool
    };
    
    var cognitoUser = new AWSCognito.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());
            //console.log(result);
            saveToken(result);
            //POTENTIAL: Region needs to be set if not already set previously elsewhere.
            AWS.config.region = 'us-east-2';
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId : 'us-east-2:da908b3b-0162-4c6d-bd3d-5bb774a78b15', // your identity pool id here
                Logins : {
                    // Change the key below according to the specific region your user pool is in.
                    'cognito-idp.us-east-2.amazonaws.com/us-east-2_JUZbvaXEG' : result.getIdToken().getJwtToken()
                }
            });
            //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
            AWS.config.credentials.refresh((error) => {
                if (error) {
                     console.error(error);
                } else {
                     // Instantiate aws sdk service objects now that the credentials have been updated.
                     // example: var s3 = new AWS.S3();
                     //console.log('Successfully logged!');
                }
            });
        cognitoUser.getUserAttributes(function(err, result){
            if (err) {
                console.log(err);
                return;
            }
                getAttr(result);
                return;
        }); 
            return;
        },
        onFailure: function(err) {
            authErr(err);
            console.log(err);
            return;
        },
    });
}
    
    function authErr(err){
    auth.status = 'error';
    auth.data = err;
}
    
function saveToken(val){
    auth.jwt = val;
}    
    
function getAttr(result){
    auth.status = 'success';
    for (var i = 0; i < result.length; i++) {
                console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue());
                userObj[result[i].getName()] = result[i].getValue();
            }
    auth.data = userObj;
    auth.raw = result;
    return;
}
    
    router.post('/api/user_sign_in', function(req, res){
        var username = req.body.username;
        var password = req.body.password;
        var result = authenticateUser(username, password);
        setTimeout(function(){
            res.json(auth);
        }, 8000);
    });
    
  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index');
  });

  module.exports = router;

}());

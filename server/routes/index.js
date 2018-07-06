(function() {

  'use strict';
  var express = require('express');
    var mysql = require('mysql');
    var AWS = require('aws-sdk');
    var colors = require('colors');
  var router = express.Router(); 
    
  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index');
  });

  module.exports = router;

}());

var express = require('express');
const helper = require("./helper.js");
var router = express.Router();
var path=require('path');

// deliver ./public/index.html
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../website/index.html'));
});

//
router.get('/profil*', function(req, res, next) {
  helper.log("Profil requested...");
  if(req.cookies['jwt']){
    res.sendFile(path.join(__dirname,'../website/priv_profil.html'));
  }
  else{
    res.render(path.join(__dirname,'../website/profil.html'));
  }
});

// Redirect to 404 Page
router.get("*",function(req, res) {
  res.status(404).sendFile(path.join(__dirname,'../website/404.html'));
});

module.exports = router;
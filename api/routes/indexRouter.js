var express = require('express');
var router = express.Router();

// deliver ./public/index.html
router.get('/', function(req, res, next) {
  res.render('home.html');
});

module.exports = router;

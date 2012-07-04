
// # express-cdn

var express = require('express')
  , path    = require('path')
  , url     = require('url')
  , app     = express.createServer();

// Set the CDN options
var options = {
    publicDir  : path.join(__dirname, 'public')
  , viewsDir   : path.join(__dirname, 'views')
  , domain     : 'cdn.your-domain.com'
  , bucket     : 'your-site'
  , key        : 'AMAZON_S3_KEY'
  , secret     : 'AMAZON_S3_SECRET'
  , hostname   : 'localhost'
  , port       : 1337
  , ssl        : false
  , production : true
};

// Initialize the CDN magic
var CDN = require('../')(app, options);

app.configure(function() {
  app.set('view engine', 'jade');
  app.set('view options', { layout: false, pretty: true });
  app.enable('view cache');
  app.use(express.bodyParser());
  app.use(express.static(path.join(__dirname, 'public')));
});

// Add the dynamic view helper
app.dynamicHelpers({ CDN: CDN });

app.get('/', function(req, res, next) {
  res.render('basic');
  return;
});

console.log("Server started: http://localhost:1337");
app.listen(1337);

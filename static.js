var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();
var pwd = process.argv[2]||'';
var port = process.argv[3]||9991;

app.configure(function(){
  app.set('port', process.env.PORT || port);
  app.set('views', __dirname + '/public');
  app.set('view engine', 'ejs');
  app.use(express.favicon('./favicon.ico'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('dude sweet'));
  
  app.use(express.session({ secret:"dude sweet", store: new MemoryStore({reapInterval:600000})}));

  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

});

app.get('/', function(req, res){
    res.sendfile('./'+pwd+'/index.html');
});

app.get('*', function(req, res){
    var cleanurl = req.url.split('?')[0];
    if(pwd) return res.sendfile('./'+pwd+cleanurl);
    return res.sendfile('.'+cleanurl);
});

app.listen(process.env.PORT||port, function(){
  console.log("Express server listening on port " + app.get('port'));
});

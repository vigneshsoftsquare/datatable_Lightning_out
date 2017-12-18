var  express =  require('express'),
     nforce = require('nforce'),
     port = process.env.PORT || 5001;

var org = nforce.createConnection({
clientId: '3MVG9d8..z.hDcPImu.PkZDAaTZwdnC1rDv6py.GjgTkxWFKSxB6yEVKHoqUV1Mi.Ach6ouuzilh2ni2zbh5C',
clientSecret: '6700028485966220927',
redirectUri: 'localhost:5001/home/oauth/_callback',
apiVersion: 'v34.0',  
environment: 'production',  
mode: 'multi' 
});

var app = express();

// Require Routes js
var routesHome = require('./routes/home');

app.use('/home', routesHome);

app.set('view engine', 'ejs');

app.use(function(req, res, next) {
    
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization,X-Authorization'); 
   res.setHeader('Access-Control-Allow-Methods', '*');
   res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
   res.setHeader('Access-Control-Max-Age', '1000');
     
   next();
});

var options = {
    key: fs.readFileSync('./key.pem', 'utf8'),
    cert: fs.readFileSync('./server.crt', 'utf8')
  };
     
  https.createServer(options, app).listen(8081);

app.get('/', function(req,res){
   console.log(org.getAuthUri());
   res.redirect(org.getAuthUri());

});

app.get('/oauth/_callback', function(req, res) {
        app.locals.oauthtoken = '00D7F000000xN6o!AQ4AQJ.3Mkpf580GQHarWsG4qHEdI3Vf9zXHYYupSybks7cqCFUPdQe9HM0N1vZdDKM2FYGICc7FvYtb8Kghyns_cGb4FMqq';
        app.locals.lightningEndPointURI = "https://datatabletestorg-dev-ed.lightning.force.com";
        res.redirect('/home');
  });

  
app.listen('5001',function(){
    console.log('got jrew');
})
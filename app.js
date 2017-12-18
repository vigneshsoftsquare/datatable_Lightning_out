var  express =  require('express'),
     nforce = require('nforce'),
     port = process.env.PORT || 5001;

var org = nforce.createConnection({
clientId: '3MVG9d8..z.hDcPImu.PkZDAaTZwdnC1rDv6py.GjgTkxWFKSxB6yEVKHoqUV1Mi.Ach6ouuzilh2ni2zbh5C',
clientSecret: '6700028485966220927',
redirectUri: 'localhost:5001/home',
apiVersion: 'v34.0',  
environment: 'production',  
mode: 'multi' 
});

var app = express();

// Require Routes js
var routesHome = require('./routes/home');

app.use('/home', routesHome);

app.set('view engine', 'ejs');

app.get('/', function(req,res){
   console.log(org.getAuthUri());
   res.redirect(org.getAuthUri());

});

app.get('localhost:5001/home', function(req, res) {
    org.authenticate({code: req.query.code}, function(err, resp){
      if(!err) {
        console.log('Access Token: ' + resp.access_token);
        app.locals.oauthtoken = resp.access_token;
        app.locals.lightningEndPointURI = "https://datatabletestorg-dev-ed.lightning.force.com";
        res.redirect('/home');
    } else {
        console.log('Error: ' + err.message);
      }
    });
  });

app.listen('5001',function(){
    console.log('got jrew');
})
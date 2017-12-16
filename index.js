var  express =  require('express'),
    nforce = require('nforce');

var app = express();

app.get('/',function(req,res){
    res.send('success');
});
app.listen('5000',function(){
    console.log('got jrew');
})
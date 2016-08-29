var express = require('express');
var app = express();
var path=require('path');
var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded( { extended: false } );
// static public folder
app.use( express.static( 'public' ) );

// base url
app.get( '/', function( req, res ){
  res.sendFile( path.resolve( 'views/index.html' ) );
}); // end base url



//spin up server
app.listen(process.env.PORT || 8080, function(){ console.log("Running on local port 8080"); });

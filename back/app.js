var express = require('express');
var app = express();

var cors = require('cors');   //FOR diffrent port run on same web like connect to React app
app.use(cors());

var bodyParser =require('body-parser');
const { urlencoded } = require('body-parser');

var mongoose = require('mongoose');
var DbUrl = 'mongodb://127.0.0.1:27017/example';
//when facing compile time error
var whenFindEroor = {useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false }; 
mongoose.connect(DbUrl, whenFindEroor );
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}));

app.get('/',function(req,res){
    res.send('<h2>its Working<h2/>');
}); 




const PORT = 3001;
app.listen(PORT,function(){
    console.log(`Server Running on port : http://localhost:${PORT}`)
})
const express = require('express');
const app = express();
const morgan = require('morgan');

function logger(req, res, next){
    console.log('I am logger');
    //next(new Error('error Ouccered'));
    next();
}

function errormw(err,req,res,next){
    console.log(err,message);

    next();
}

app.use(logger);
app.use(morgan('dev'));

app.listen(3000,function(){
    console.log('Server is runing');
})
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const user = require('./api/user');

if(process.env.NODE_ENV !== 'test'){
    app.use(morgan('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/users',user);

// app.listen(3000, function () {
//     console.log('Example app listening on port 3000');
// });

module.exports = app;
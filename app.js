const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mainRoute=require('./route/mainRoute');
const tradeRouter=require('./route/tradeRoute');
const mongoose = require('mongoose');

const app = express();

let port = 8080;
let host = 'localhost';
app.set('view engine', 'ejs');

//connecting to database 
mongoose.connect('mongodb://127.0.0.1:27017/techguru',
        {useNewUrlParser: true,useUnifiedTopology: true})
.then(()=> {    
//start the server
app.listen(port, host, ()=>{
    console.log('Server is running on port', port);
    });
})
.catch(err=>console.log(err.message));

app.use(express.static('public')); 
app.use(express.urlencoded({extended: true})); 
app.use(morgan('tiny')); 
app.use(methodOverride('_method'));

app.get('/',(req,res)=> {
    res.render('index');
}); 

app.use('/',mainRoute);

app.use('/trades',tradeRouter);

app.use((req, res, next)=> {
    let err = new Error('The server cannot locate resource at ' + req.url);
    err.status = 404;
    next(err); //default error handler
});


app.use((err, req, res, next)=>{
    console.log(err.stack);
    if(!err.status){
    err.status = 500;
    err.message = ("Internal Server Error");
   }
   res.status(err.status);
   res.render('error', {error: err});
});



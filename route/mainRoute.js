const express=require('express');
const maincontroller = require('../controllers/mainController');
const mainrouter=express.Router();
mainrouter.get('/',maincontroller.index);

mainrouter.get('/index', maincontroller.index);


mainrouter.get('/contact',maincontroller.contact);

mainrouter.get('/about',maincontroller.about);

module.exports=mainrouter;

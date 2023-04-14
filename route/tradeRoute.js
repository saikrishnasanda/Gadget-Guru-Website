const express=require('express');
const tradecontroller = require('../controllers/tradeController');
const traderouter=express.Router();

traderouter.get('/newTrade',tradecontroller.newTrade);

// traderouter.get('/EditForm',tradecontroller.EditForm);

traderouter.get('/',tradecontroller.products);

//Get /trade
traderouter.get('/:id',tradecontroller.trade);

//Get // edit form
traderouter.get('/:id/edit',tradecontroller.edit);


//new

traderouter.post('/',tradecontroller.create);

// traderouter.get('/trades',tradecontroller.trades);

//update

traderouter.put('/:id',tradecontroller.update);

//delete

traderouter.delete('/:id',tradecontroller.delete);

module.exports=traderouter;

//Get /newTrade.ejs
const express = require('express');
const model=require('../models/item');
const { redirect } = require('express/lib/response');
exports.newTrade = (req,res)=>{
    res.render('./trades/newTrade');
      };

          //products
          exports.products = (req,res,next)=>{
           model.find()
          .then(trades=>res.render('./trades/trades',{trades}))
          .catch(err=>next(err));
              };


            exports.create = (req, res, next)=>{
              let product = new model(req.body); 
              product.save() // insert the document to the db
              .then((product)=> {
                  res.redirect('/trades');
              } )
              .catch(err=>{
                  if(err.name ==='ValidationError') {
                      err.status = 400;
                  }
                  next(err);
              });
          };
    
    //Get /trade.ejs

        exports.trade = (req, res, next)=>{
          let id = req.params.id;
          //an object id is a 24-bit string
          if(!id.match(/^[0-9a-fA-F]{24}$/)){
              let err= new Error('Invalid product id');
              err.status = 400;
              return next(err);
          }   
          model.findById(id)
          .then(product=>{
              if(product) {
                 return res.render('./trades/trade', {product});
              } else {
                  let err = new Error('Cannot find a product with id ' + id);
                  err.status = 404;
                  next(err);
              }
          })
          .catch(err=>next(err));  
      };
    

       exports.edit = (req, res, next)=>{

        let id = req.params.id;
        if(!id.match(/^[0-9a-fA-F]{24}$/)){
            let err= new Error('Invalid product id');
            err.status = 400;
            return next(err);
        }   
        model.findById(id)
        .then(product=>{
            if(product) {
               return  res.render('./trades/Edit', {product});
            } else {
                let err = new Error('Cannot find a product with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err=>next(err));
    };

       //update

     exports.update = (req, res, next)=>{
      let product = req.body;
      let id = req.params.id;
      if(!id.match(/^[0-9a-fA-F]{24}$/)){
          let err= new Error('Invalid product id');
          err.status = 400;
          return next(err);
      }   
      model.findByIdAndUpdate(id, product, {useFindAndModify: false, runValidators: true})
      .then(product=> {
          if(product){
              res.redirect('/trades/'+id);
          }
          else {
              let err = new Error('Cannot find a product with id ' + id);
              err.status = 404;
              next(err);
          }
      }
          )
      .catch(err=> {
          if(err.name === 'ValidationError')
              err.status = 400;
          next(err);
       });
  };
     //delete
  exports.delete = (req, res, next)=>{
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err= new Error('Invalid product id');
        err.status = 400;
        return next(err);
    } 

    model.findByIdAndDelete(id, {useFindAndModify: false})
   .then(product=>{
    if(product) {
        res.redirect('/trades');
    } else{
        let err = new Error('Cannot find a product with id ' + id);
        err.status = 404;
        return next(err);
    }
    })
   .catch(err=> next(err));
};



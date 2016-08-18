var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bear = require('./../models/bear.js');
mongoose.Promise=global.Promise;
//GET
router.get('/', function(req, res){
 bear.find(function(err, data) {
     if (err)
         res.send(err);
     res.json(data);
 });
});
//POST
router.post('/', function(req, res)
{
  console.log("call");
  console.log(req.body.subject);
  var br = new bear();

br.from=req.body.from;
br.subject=req.body.subject;
br.date=req.body.date;
br.save(function(err,succ){
  console.log("inside save calback");
  if(err){
    console.log("error");
    res.send(err);
  }
  else{
    console.log("success");
    res.send({"response" :"done" });
  }
});
});
//DELETE
router.delete('/', function(req, res)
{
  //var br = new bear();
  bear.remove({name:req.body.name},function(err) {
       if (err)
           res.send(err);

   console.log("removed");
   });
});
//PUT
router.put('/',function(req,res)
  {
    console.log("error");
    bear.findById({_id:req.body.id},function(err,data)
    {
      if(err)
      {
        res.send(err);
      }
        data.name=req.body.name;
        data.save(function(err) {
             if (err){
                 res.send(err);
             }
         console.log("saved");
      });
    });
  });

  //  bear.password=req.body.password;

  //res.send("hello"+req.body.password);
  //  res.send("hai"+req.body.password);



module.exports=router;

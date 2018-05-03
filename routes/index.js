var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');


var database = require('../config/database');
var College = require('../models/collegedetails');





mongoose.connect(database.url, function(err,db)

{
  if(db)
  console.log("connected");
});
/* GET home page. */
//router.get('/', function(req, res, next) {
  //res.render('index', { title: 'college details' });
//});

router.get('/', function(req, res, next) {
  College.find({},function (err, item) {
          if (err)
           res.send('err');
  else
  console.log(item);
    res.send(item);


});
});




router.put('/api/student/:student_id', function(req, res) {


 // create mongose method to update a existing record into collection
 var id = req.params.student_id;
 var data = {
   clgname:req.body.clgname,
   clgcode:req.body.clgcode,
   clgaddress:req.body.clgaddress,
   phno:req.body.phno,
   emailid:req.body.emailid,
   cname:req.body.cname,
   cnumber:req.body.cnumber

 }
 College.findByIdAndUpdate(id, data, function(err, collegedetails) {
 if (err) throw err;

 res.send('Successfully! student updated - ');
 });
});


 router.get('/api/student/:_id', function(req, res) {

  console.log(req.params._id);
  var id = req.params._id;
  College.remove({
  _id : id
  }, function(err) {
  if (err)
  res.send(err);
  else
  res.send('Successfully! student has been Deleted.');
  });
 });





router.post('/insert', function(req, res) {
  var college=new College({
  clgname:req.body.clgname,
  clgcode:req.body.clgcode,
  clgaddress:req.body.clgaddress,
  phno:req.body.phno,
  emailid:req.body.emailid,
  cname:req.body.cname,
  cnumber:req.body.cnumber

})
college.save(function (err, item) {
        if (err)
         res.send('err');
else
  res.send( 'sucessfullyinserted' );
});
});

module.exports = router;

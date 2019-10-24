var express = require('express');
var db = require('../../models/db');
var router = express.Router();

router.post('/',function(request,response){
    var reginfo = {
        firstname: request.body.first_name,
        lastname: request.body.last_name,
        email: request.body.email,
        usertype: request.body.user_type,
        phoneno: request.body.phoneNo,
        address: request.body.address,
        password: request.body.password
    };
    var usert;
    if(reginfo.usertype=="Admin"){
        usert="admin";
    }
    else{
        usert="customer";
    }
    var sql ="insert into user values('','"+reginfo.email+"', '"+ reginfo.password+"', '"+reginfo.firstname+"', '"+reginfo.lastname+"', '"+usert+"', '"+reginfo.phoneno+"', '"+reginfo.address+"')";
    db.execute(sql, function(status){
        
           if(status){
                response.redirect('/admin');
           }
           else{
                response.send("error reg.js");
           }
        
    });

});





module.exports=router;
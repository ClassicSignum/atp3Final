var db= require('../models/db');
var express = require('express');
module.exports = {

    getAll: function(callback){
		var sql = "select * from user where usertype='customer'";
		
		db.getResults(sql, function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});	
	},

    update: function(user, callback){
		var sql ="update user set firstname='"+ user.firstname+"',lastname='"+ user.lastname+"', password='"+user.password+"',address='"+ user.address+"',phoneno='"+ user.phoneno+"' where usermail="+user.email;
		
		

		db.execute(sql, function(status){
			callback(status);
		});
	},
    getById: function(loginemail, callback){

        console.log(loginemail);
        var sql = "select * from user where usermail='"+loginemail+"'";
        db.getResults(sql, function(result){
            if(result.length > 0 ){
                console.log(result);
                callback(result);
            }else{
                callback([]);
            }
        });
},

    insertCustCare: function(reginfo, callback){
        var sql ="insert into userinfo values('','"+reginfo.firstname+"', '"+ reginfo.lastname+"', '"+reginfo.email+"', '"+reginfo.password+"', 'customercare', '"+reginfo.address+"', '"+reginfo.phoneno+"')";
		db.execute(sql, function(status){
            var sql="insert into user values('','"+reginfo.email+"','"+reginfo.password+"','customercare')";
            db.execute(sql,function(status){
                callback(status);
            });
		});
    }
}
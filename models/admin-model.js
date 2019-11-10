var db= require('../models/db');
var express = require('express');
module.exports = {


    // ADMIN INFO STARTS
    
    update: function (user, callback) {
        var sql = "update userinfo set firstname='" + user.firstname + "',lastname='" + user.lastname + "', password='" + user.password + "',address='" + user.address + "',phoneno='" + user.phoneno + "' where usermail='" + user.email+"'";



        db.execute(sql, function (status) {
            callback(status);
        });
    },

    updateNotPassword: function (user, callback) {
        var sql = "update userinfo set firstname='" + user.firstname + "',lastname='" + user.lastname + "',address='" + user.address + "',phoneno='" + user.phoneno + "' where usermail='"+user.email+"'";


        db.execute(sql, function (status) {
            callback(status);
        });
    },
    getMyInfo: function (loginemail, callback) {

        console.log(loginemail);
        var sql = "select * from userinfo where usermail='" + loginemail + "'";
        db.getResults(sql, function (result) {
            if (result.length > 0) {
                // console.log(result);
                callback(result);
            } else {
                callback([]);
            }
        });
    },
    
    // ADMIN INFO endS

    // USERS SECTION STARTS
    permitOrRestrict:function(action,email,callback){

        var sql="update userinfo set status='"+action+"' where usermail='"+email+"'";

        db.execute(sql, function (status) {
            callback(status);
        });

    },

    getAll: function (usertype,callback) {
        var sql = "select * from userinfo where usertype='" + usertype + "'";

        db.getResults(sql, function (results) {
               
            if (results.length > 0) {
                callback(results);
            } else {
                callback([]);
            }
        });
    },
    deleteAccount:function(email,callback){ //inner join used to delete from multiple table...
        var sql="delete user,userinfo from user inner join userinfo on userinfo.usermail=user.usermail where user.usermail='"+email+"'";

        db.execute(sql,function(status){
            callback(status);
        });
    },

    messageToCare:function(email,msg,callback){
        var sql="insert into messagetocare values('','"+email+"','"+msg+"')";
        db.execute(sql,function(status){
            callback(status);
        })
    },
        // USERS SECTION ends

     getAll: function (usertype,callback) {
        var sql = "select * from userinfo where usertype='" + usertype + "'";

        db.getResults(sql, function (results) {
               
            if (results.length > 0) {
                callback(results);
            } else {
                callback([]);
            }
        });
    },

    //car info starts
    insertCar:function(info,callback){
        var sql="insert into carinfo values('','"+info.vehicletype+"','"+info.cost+"','"+info.title+"','"+info.title+"','available')";
        db.execute(sql,(status)=>{
            callback(status);
        })
    },
    //car info ends
    

    //admin rent history starts
    getAllRentHistory:function(callback){
        var sql = " select * from rentalhistory";

        db.getResults(sql,(results)=>{
            callback(results);
        })

    }
    //admin rent history ends

   
}
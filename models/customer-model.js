var db = require('../models/db');
var express = require('express');
module.exports = {

    // customer INFO STARTS

    update: function (user, callback) {
        var sql = "update userinfo set firstname='" + user.firstname + "',lastname='" + user.lastname + "', password='" + user.password + "',address='" + user.address + "',phoneno='" + user.phoneno + "' where usermail='" + user.email + "'";



        db.execute(sql, function (status) {
            callback(status);
        });
    },

    updateNotPassword: function (user, callback) {
        var sql = "update userinfo set firstname='" + user.firstname + "',lastname='" + user.lastname + "',address='" + user.address + "',phoneno='" + user.phoneno + "' where usermail='" + user.email + "'";


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

    // customer INFO endS


    //customer private car starts
    getPrivateCar:function(callback){
        var sql="select * from carinfo where type='Private car' and status='available'";
       db.getResults(sql,function(results){
           if(results.length>0){
               callback(results);
           }
           else{
               callback([]);
           }
       })
    },
    //customer private car ends


    //customer micro car starts
    getMicroCar:function(callback){
        var sql="select * from carinfo where type='Microbus' and status='available'";
       db.getResults(sql,function(results){
           if(results.length>0){
               callback(results);
           }
           else{
               callback([]);
           }
       })
    },
    //customer micro car ends


    //customer pickup car starts
    getPickupCar:function(callback){
        var sql="select * from carinfo where type='Pick-up' and status='available'";
       db.getResults(sql,function(results){
           if(results.length>0){
               callback(results);
           }
           else{
               callback([]);
           }
       })
    },
    //customer pickup car ends


    //customer rent this starts
    inserRent:function(rentinfo,callback){
        var sql="insert into rentalhistory values('','"+rentinfo.email+"','"+rentinfo.cartitle+"','"+rentinfo.datefrom+"','"+rentinfo.dateto+"','"+rentinfo.rentday+"','"+rentinfo.totalrent+"','"+rentinfo.payment+"','pending')";
        db.execute(sql,(status)=>{
            callback(status);
        })
    },
    //customer rent this ends


    //customer blog 

    insertBlog:function(info,callback){
        var sql ="insert into blog values('','"+info.email+"','"+info.blog+"') ";
        db.execute(sql,(status)=>{
            callback(status);
        })
    }

}
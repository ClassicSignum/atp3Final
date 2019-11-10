var express = require('express');
var db = require('../../models/db');
var router = express.Router();
var customerModel = require('../../models/customer-model');

router.get('/',function(request,response){
    response.render('customer/index');
});

//customer PROFILE STARTS
router.get('/customerProfile', function (request, response) { //show customerC account page
    customerModel.getMyInfo(request.session.loginemail, function (result) {
        response.render('customer/customerProfile', { users: result });
    });
});


router.post('/customerProfile', function (request, response) {

    var reginfo = {
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        email: request.body.email,
        phoneno: request.body.phoneno,
        address: request.body.address,
        password: request.body.createpassword,
        confirmpassword: request.body.confirmpassword
        

    };
    

    if (reginfo.firstname == "" || reginfo.lastname == "" || reginfo.phoneno == "" || reginfo.address == "") {
        response.send("please fill up all the information");
    }
    else if (reginfo.password != "") {

        if (reginfo.password.length < 7) {
            response.send("at leats 6 characters and one number");
        }
        else if (!reginfo.password.match(/[a-z]/)) {
            response.send("at leats 6 characters and one number");

        }
        else if (!reginfo.password.match(/\d+/)) {
            response.send("at leats 6 characters and one number");

        }
        else if (reginfo.password != reginfo.confirmpassword) {
            response.send(" Retype password");
        }
        else {
            customerModel.update(reginfo, function (status) {
                if (status) {
                    response.redirect('/customer');
                } else {
                    // response.redirect('/user/edit/'+request.params.id);
                    response.send("problem inserting");
                }
            });
        }

    }

    else {
        customerModel.updateNotPassword(reginfo, function (status) {
            if (status) {
                response.redirect('/customer');
            } else {
                // response.redirect('/user/edit/'+request.params.id);
                response.send("problem inserting");
            }
        });
    }


});

//customer PROFILE ENDS


//customer private car starts
router.get('/customerPrivateCar',(request,response)=>{

    customerModel.getPrivateCar(function(result){
        
        response.render('customer/customerPrivateCar',{car : result});
    })


});

router.post('/customerPrivateCar',function(request,response){
    var info = {
        title: request.body.cartitle,
        cost: request.body.carcost
    }

    request.session.selectcar=info.title;
    response.redirect('/customer/customerSelectCar');

});
//customer private car ends

//customer mimcro car starts
router.get('/customerMicro',(request,response)=>{

    customerModel.getMicroCar(function(result){
        
        response.render('customer/customerMicro',{car : result});
    })


});

router.post('/customerMicro',function(request,response){
    var info = {
        title: request.body.cartitle,
        cost: request.body.carcost
    }

    request.session.selectcar=info.title;
    response.redirect('/customer/customerSelectCar');

});
//customer mimcro car ends

//customer pick-up car starts
router.get('/customerPickup',(request,response)=>{

    customerModel.getPickupCar(function(result){
        
        response.render('customer/customerPickup',{car : result});
    })


});

router.post('/customerPickup',function(request,response){
    var info = {
        title: request.body.cartitle,
        cost: request.body.carcost
    }

    request.session.selectcar=info.title;
    response.redirect('/customer/customerSelectCar');

});
//customer pick-up car ends



//customer select car starts
router.get('/customerSelectCar',(request,response)=>{
    var sql="select * from carinfo where cartitle='"+request.session.selectcar+"'";
   
    db.getResults(sql,(result)=>{
        if(result.length>0){
            
        response.render('customer/customerSelectCar',{result});
        }
    })
});

router.post('/customerSelectCar',(request,response)=>{
    request.session.rentday = request.body.rentday;
    response.redirect('/customer/customerRent');
});
//customer select car ends


//customer rent this starts
router.get('/customerRent',function(request,response){
    var sql = "select * from carinfo where cartitle='"+request.session.selectcar+"'";
    var cost;
    db.getResults(sql,(result)=>{
        if(result.length>0){
            cost=result[0].cost;
            var totalCost = cost*request.session.rentday;
            var rentinfo = {
                days : request.session.rentday,
                totalCost : totalCost,
                result : result
            }
            // console.log(rentinfo);
            response.render('customer/customerRent',{rentinfo});
        }
    })

});   

router.post('/customerRent',function(request,response){
    if(request.body.submit=="cancel"){
        response.redirect('/customer');
    }
    else{
        datefrom = new Date(request.body.datefrom);
        dateto = new Date(request.body.dateto);
        var rentinfo = {
            email: request.session.loginemail,
            cartitle: request.body.cartitle,
            datefrom: datefrom,
            dateto: dateto,
            rentday: request.body.totaldays,
            totalrent: request.body.totalcost,
            payment: request.body.paymentoption
        }

        if(rentinfo.datefrom > rentinfo.dateto){

            response.redirect('/customer');

        }
        else{
            var diff = Math.abs(rentinfo.dateto.getTime() - rentinfo.datefrom.getTime());
            var totaldays = Math.ceil(diff / (1000 * 3600 * 24));
            if(totaldays!=rentinfo.rentday){

                response.redirect('/customer');

            }
            else{
                var sql = "select * from user where usermail='"+rentinfo.email+"' and password='"+request.body.password+"' ";
                db.getResults(sql,(result)=>{
                    if(result.length>0){

                        customerModel.inserRent(rentinfo,(status)=>{
                            if(status){
                                response.redirect('/customer');
                            }   
                            else{
                                response.redirect('/customer');
                            }
                        })

                    }
                    else{
                        response.redirect('/customer');
                    }
                })
                
            }
        }    
    }
});
//customer rent this ends   


//customer rent history starts

router.get('/customerRentHistory',function(request,response){
    var sql="select * from rentalhistory where usermail='"+request.session.loginemail+"' ";
    db.getResults(sql,(result)=>{
        if(result.length>0){
            response.render('customer/customerRentHistory',{result});
        }
    });
});



//customer rent history ends



//customer blog starts
router.get('/customerBlog',(request,response)=>{
    var sql = "select * from blog";
    db.getResults(sql,(result)=>{
        if(result.length>0){
            response.render('customer/customerBlog',{result});
        }
    })
});
//customer blog ends


//customer add blog

router.get('/customerAddBlog',(request,response)=>{
    var sql = "select * from blog where usermail ='"+request.session.loginemail+"' ";
    db.getResults(sql,(result)=>{
        if(result.length>0){
            response.render('customer/customerAddBlog',{result});
        }
        else{
            response.render('customer/customerAddBlog',{result});
        }
    })
   
});

router.post('/customerAddBlog',(request,response)=>{

    if(request.body.submit=="submit"){
        var info = {
            email: request.session.loginemail,
            blog : request.body.blog
        }
        customerModel.insertBlog(info,(status)=>{
            if(status){
                response.redirect('/customer/customerBlog');
            }
            else{
    
            }
        })
    }
    else{
        var sql = "delete from blog where id='"+request.body.id+"'";
        db.execute(sql,(status)=>{
            if(status){
                response.redirect('/customer/customerBlog');
            }
        })
    }
    
});




module.exports = router;
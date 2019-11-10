var exprss=require('express');
var adminModel= require('../../models/admin-model');
var router= exprss.Router();
var multer = require('multer');
var db = require('../../models/db');

router.get('/',function(request,response){
    response.render('admin/index');
});


//ADMIN PROFILE STARTS
router.get('/adminProfile', function (request, response) { //show customerC account page
    adminModel.getMyInfo(request.session.loginemail, function (result) {
        response.render('admin/adminProfile', { users: result });
    });
});


router.post('/adminProfile', function (request, response) {

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
            adminModel.update(reginfo, function (status) {
                if (status) {
                    response.redirect('/admin');
                } else {
                    // response.redirect('/user/edit/'+request.params.id);
                    response.send("problem inserting");
                }
            });
        }

    }

    else {
        adminModel.updateNotPassword(reginfo, function (status) {
            if (status) {
                response.redirect('/admin');
            } else {
                // response.redirect('/user/edit/'+request.params.id);
                response.send("problem inserting");
            }
        });
    }


});

//ADMIN PROFILE ENDS


//ADMIN CUST Info STARTS

router.get('/adminCustInfo', function (request, response) { //show customerC account page
    adminModel.getAll("customer", function (result) {
        response.render('admin/adminCustInfo', { users: result });
    });
});

router.post('/adminCustInfo', function (request, response) {
    if (request.body.submit == "permitted") {

        adminModel.permitOrRestrict("restricted", request.body.email, function (status) {
            if (status) {
                response.redirect('/admin');
            }
            else {
                response.send("problem ");
            }
        });
    }
    else if (request.body.submit == "restricted") {

        adminModel.permitOrRestrict("permitted", request.body.email, function (status) {
            if (status) {
                response.redirect('/admin');
            }
            else {
                response.send("problem ");
            }
        });
    }
    else if (request.body.submit == "send") {

        var message=request.body.messagebox;
        var email=request.body.email;
        adminModel.messageToInfo(email,message,function(status){
            if(status){
                response.redirect('/admin/adminCustInfo');
            }
            else{
                response.send("prob");
            }
        });
    }
    else {
        adminModel.deleteAccount(request.body.email, function (status) {
            if (status) {
                response.redirect('/admin');
            }
            else {
                response.send("problem ");
            }
        });
    }
});

//ADMIN CUST Info ENDS


//admin Add a vehicle starts

var storage = multer.diskStorage({
	destination: function (req, file, callback) {
	  callback(null, './public/images/vehicles/')
	},
	filename: function (req, file, callback) {
	  callback(null, req.body.cartitle + '.jpg') 
	}
  })

var upload = multer({ storage: storage }).single('cartitle');

router.get('/adminAddVehicle',function(request,response){
    response.render('admin/adminAddVehicle');
});

router.post('/adminAddVehicle',function(request,response){

    upload(request,response,(err)=>{
        var carinfo = {
            vehicletype : request.body.vehicletype,
            title : request.body.cartitle,
            cost : request.body.carcost
        };
    
        if(err){
            response.render('admin/adminAddVehicle',{msg:err});
        }
        else{
            // console.log(request.file);
            // response.redirect('/admin');
            adminModel.insertCar(carinfo,function(status){
                if(status){
                    response.redirect('/admin');
                }
                else{
                    response.send("prob");
                }
            })
        }
    })

   
    
});

//admin Add a vehicle ends


//admin rent history starts
router.get('/adminRentHistory',(request,response)=>{
   adminModel.getAllRentHistory(function(result){
       if(result.length>0){
           response.render('admin/adminRentHistory',{result});
       }
   })
});

router.post('/adminRentHistory',(request,response)=>{
    if(request.body.submit=="pending"){
        var sql = "update rentalhistory set status='successful' where usermail='"+request.body.email+"' and cartitle='"+request.body.cartitle+"' ";
        db.execute(sql,(status)=>{
            if(status){
                response.redirect('/admin/adminRentHistory');
            }
        })
    }
    else{

        var sql = "update rentalhistory set status='pending' where usermail='"+request.body.email+"' and cartitle='"+request.body.cartitle+"' ";
        db.execute(sql,(status)=>{
            if(status){
                response.redirect('/admin/adminRentHistory');
            }
        })

    }
 });
//admin rent history ends

//admin blog starts
router.get('/adminBlog',(request,response)=>{
    var sql = "select * from blog";
    db.getResults(sql,(result)=>{
        if(result.length>0){
            response.render('admin/adminBlog',{result});
        }
        else{
            response.redirect('/admin');
            
        }
    })
});


router.post('/adminBlog',(request,response)=>{
    var sql = "delete from blog where id='"+request.body.id+"' ";
    db.execute(sql,(status)=>{
        response.redirect('/admin/adminBlog');
    })
});
//admin blog ends

module.exports = router;
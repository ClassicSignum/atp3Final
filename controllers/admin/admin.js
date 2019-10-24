var exprss=require('express');
var adminModel= require('../../models/admin-model');
var router= exprss.Router();

router.get('/',function(request,response){
    response.render('admin/index');
});
router.get('/adminProfile',function(request,response){

    console.log(request.session.loginemail);
    adminModel.getById(request.session.loginemail, function(result){
		response.render('admin/adminProfile',  {users: result});
	});
    
});

router.get('/adminAllCust',function(request,response){
    adminModel.getAll(function(results){
        if(results.length>0){
            response.render('admin/adminAllCust', {users: results});		
        }else{
            response.redirect('/logout');
        }
    });	
});

router.post('/adminEdit', function(request, response){
    var user = {
		usermail: request.body.email,
		password: request.body.password
	};
	adminModel.getById(user.usermail, function(result){
		response.render('admin/adminEdit', result);
	});
	
});

router.post('/adminProfile',function(request,response){

    var reginfo = {
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        email: request.body.email,
        phoneno: request.body.phoneno,
        address: request.body.address,
        password: request.body.password
    };
    if(reginfo.firstname==""|| reginfo.lastname=="" || reginfo.email=="" || reginfo.phoneno=="" || reginfo.address==""){
        response.send("please fill up all the information");
    }
    
    else{
        adminModel.update(reginfo,function(status){
            if(status){
                response.redirect('/admin');
            }else{
                // response.redirect('/user/edit/'+request.params.id);
                response.send("problem inserting");
            }
        });
    }


   
});


router.post('/adminAddCust',function(request,response){
    var reginfo = {
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        email: request.body.email,
        phoneno: request.body.phoneno,
        address: request.body.address,
        password: request.body.password,
        confirmpassword: request.body.confirmpassword
    };

    if(reginfo.firstname==""|| reginfo.lastname=="" || reginfo.email=="" || reginfo.phoneno=="" || reginfo.address=="" || reginfo.password=="" || reginfo.confirmpassword==""){
        response.send("please fill up all the information");
    }
    else if(reginfo.password.length<7){
        response.send("at leats 6 characters and one number");
    }
    else if (!reginfo.password.match(/[a-z]/)) {
        response.send("at leats 6 characters and one number");
        
    }
    else if (!reginfo.password.match(/\d+/)) {
        response.send("at leats 6 characters and one number");
        
    }
    else if(reginfo.password!=reginfo.confirmpassword){
        response.send(" Retype password");
    }
    else{
        adminModel.insertCustCare(reginfo,function(status){
            if(status){
                response.redirect('/admin');
            }else{
                // response.redirect('/user/edit/'+request.params.id);
                response.send("problem inserting");
            }
        });
    }

});


module.exports = router;
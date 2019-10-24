var exprss=require('express');
var adminModel= require('../../models/admin-model');
var router= exprss.Router();

router.get('/',function(request,response){
    response.render('admin/index');
});
router.get('/adminAddCust',function(request,response){
    response.render('admin/adminAddCust');
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
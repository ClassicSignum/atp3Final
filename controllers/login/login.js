var exprss=require('express');
var router = exprss.Router();
var db=require('../../models/db');

var router= exprss.Router();

// router.get('*', function(request, response, next){

// 	if(request.session.loginemail != null){
// 		next();
// 	}else{
// 		response.redirect('/logout');
// 	}

// });

router.post('/',function(request,response){
    var login={
        email: request.body.email,
        password: request.body.password
    };
    if(request.body.remember){
        response.cookie('loginemail', login.email);//creates cookies as loginemail
        response.cookie('loginpass', login.password);//creates cookies as loginemail
        response.cookie('remem',"checked");
    }
    else{
        // response.clearCookie('loginemail');
        // response.clearCookie('loginpass');
        // response.clearCookie('remem');
        response.cookie('loginemail', "");//creates cookies as loginemail
        response.cookie('loginpass', "");//creates cookies as loginemail
        response.cookie('remem',"");
    }
    var sql ="select * from user where usermail='"+login.email+"' and password='"+login.password+"'";
    db.getResults(sql, function(results){

        if(results.length > 0){
            request.session.loginemail=login.email;// creates session as loginemail
            
            response.redirect('/usertype');
            
        }else{
            response.send("invalid login")
        }
    });	
});

module.exports = router;
var db= require('../models/db');

module.exports = {
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
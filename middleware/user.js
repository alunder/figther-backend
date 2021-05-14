
const UserModel = require('../models/user');
const AdminUserModel = require('../models/admin-user');
const Boom = require('boom');
const Jwt = require('jsonwebtoken');
const Env = require('../env');
const privateKey = Env.JWT_PRIVATE_KEY;

exports.user = async (request,reply) =>{
    var status = false;
    var allowed_url = [
        '/api/v1/healthcheck',
        '/api/v1/user/signup',
        '/api/v1/user/login',
        '/api/v1/user/forgetpassword',
        '/api/v1/image/',
        '/api/v1/dummy/set',
        '/api/v1/dummy/location/set',
        '/api/v1/dummy/fighter/set',
        '/api/v1/image/save',
        '/api/v1/admin/image/save',
        '/api/v1/chat/delete',
        '/api/v1/all/delete',
        '/api/v1/admin/user/login'
    ];
    // console.log(request.url.path);
    for(var i = 0; i < allowed_url.length; i++){
        // if(allowed_url[i] == request.url.path){
        //     status = true;
        // }
        if(request.url.path.indexOf(allowed_url[i]) > -1) {
            status = true;
        }
    }
    if(!status){
        var token = request.headers['auth-token'];
        if(token){
            var data =  await Jwt.verify(token, privateKey, function(err, decoded) {
                if (err) {
                    return false;
                }
                else {
                    
                    return (decoded.data);
                }
            });            
            if(data){
                if(request.url.path.indexOf("admin") > -1) {
                    var admin_user = await AdminUserModel.findOne({username:data.username});
                    if(admin_user){
                        status = true;
                        request.username = data.username;                    
                    } else {
                        status = false;
                    }
                } else {
                    var user = await UserModel.findOne({username:data.username});
                    if(user){
                        status = true;
                        request.username = data.username;                    
                    } else {
                        status = false;
                    }
                }
                
    
            } else {
                status = false;
            }
        } else {
            status = false;
        }
      
    }
    if (status) {
        //Redis is running, continue to handler
        return reply.continue();
    } else {
        //Redis is down, reply with error
        return reply(Boom.unauthorized('You are not Authorized!'));
    }
};




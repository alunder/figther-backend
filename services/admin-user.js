const UserModel = require('../models/user');
const AdminUserModel = require('../models/admin-user');
const CreditCardModel = require('../models/credit-card');
const FighterModel = require('../models/fighter');
const EventModel = require('../models/event');
const FighterUserModel = require('../models/fighter-user');
const bcrypt = require('bcrypt');
const Env = require('../env');
const Jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const private_key = Env.JWT_PRIVATE_KEY;
const random = require('random-number');
const options = {
    min:  100000, 
    max:  999999, 
    integer: true
  };

exports.login = async (request,response) => {
    var user = await AdminUserModel.findOne({$or:[{email: request.payload.username},{username:request.payload.username}]});
    if(!user){
        return {
            message: "Username doesn't exist!",
            username: null,
            token: null,
            is_success:false,
            avatar:null,
            full_name:null,
        };
    }   
    var password = request.payload.password;
    var hash_password = user.password;    
    if (bcrypt.compareSync(password, hash_password)) {      
        var obj_response = {
          username: user.username,          
          token: getUserToken(user),
          message: "Login Success!",
          avatar: user.avatar,
          full_name: user.full_name,
          is_success: true,         
        };       
        return obj_response;
        
    } else {
        return {
            message: "Password is not correct!",
            username: null,
            token: null,
            avatar:null,
            full_name: null,
            is_success:false,
        };
    }
    
};
function getUserToken(user){
    var expire_time = '1024h';
    var token_data = {
        username: user.username,
        email: user.email,
        id: user._id,       
    };
    return Jwt.sign({data:token_data}, private_key,{expiresIn: expire_time});            
} 

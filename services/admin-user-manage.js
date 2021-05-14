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

exports.getAll = async (request,response) => {
    var users = await UserModel.find({});
    return users;    
};
exports.deleteUser = async (request,response) => {
    var id = request.params.id;
    await UserModel.find({_id:id}).remove();
    var users = await UserModel.find({});
    return users;    
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

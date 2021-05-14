const UserModel = require('../models/user');
const AdminUserModel = require('../models/admin-user');
const CreditCardModel = require('../models/credit-card');
const FighterModel = require('../models/fighter');
const EventModel = require('../models/event');
const FighterUserModel = require('../models/fighter-user');
const ClubModel = require('../models/club');
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
exports.add = async (request,response) => {
    var user_email = await UserModel.findOne({email: request.payload.email});
    var user_username = await UserModel.findOne({username: request.payload.username});
    if(user_email){
        return {
            message: 'You are already Registered!',
            is_success: false,
        };
    }
    if(user_username){
        return {
            message: 'User name is already exist!',
            is_success: false,
        };
    } 
    var user = new UserModel();
    user.email = request.payload.email;
    user.username = request.payload.username;
    let hash = bcrypt.hashSync(request.payload.password, 10);
    user.password = hash;
    user.is_first = true;
    user.profile_completed = false;
    user.is_active = true;
    await user.save(function(error){
        // console.log(error);
    });
    var club = new ClubModel(request.payload);
    club.user_id = user._id;
    club.is_active = true;
    await club.save();
    return {
        message: 'Success!',
        is_success: true,
    };
};
exports.getAll = async (request,response) => {
    var clubs = await ClubModel.find({is_active:true});
    return clubs;    
};
exports.deleteClub = async (request,response) => {
    var id = request.params.id;
    var club = await ClubModel.findOne({_id:id});
    club.is_active = false;
    await club.save();
    var clubs = await ClubModel.find({is_active:true});
    return clubs;
};
exports.getOne = async (request,response) => {
    var id = request.params.id;
    var club  = await ClubModel.findOne({_id:id,is_active:true});
    return club;
};
exports.updateOne = async (request,response) => {
    var id = request.params.id;
    var user = await UserModel.findOne({_id:request.payload.user_id});
    if(request.payload.password){
        let hash = bcrypt.hashSync(request.payload.password, 10);
        user.password = hash;
        user.is_first = true;
        user.profile_completed = false;
        await user.save(function(error){
            // console.log(error);
        });
    }    
    var club = await ClubModel.findByIdAndUpdate(id,request.payload);
    club.user_id = user._id;
    await club.save();
    return {
        message: 'Success!',
        is_success: true,
    };
};
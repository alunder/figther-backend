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
var mongoose = require('mongoose');
exports.add = async (request,response) => {
   var event = new EventModel(request.payload);
   event.is_active = true;
   await event.save(function(err){
     if(err) console.log(err);
   });
   return true;   

};
exports.getAll = async (request,response) => {
    var events = await EventModel.find({is_active:true});
    return events;    
};
exports.deleteEvent = async (request,response) => {
    var id = request.params.id;
    var event = await EventModel.findOne({_id:id});
    event.is_active = false;
    await event.save();
    var events = await EventModel.find({is_active:true});
    return events;    
};
exports.getOne = async (request,response) => {
    var id = request.params.id;
    var event = await EventModel.findOne({_id:id,is_active:true});
    return event;
   
};
exports.updateOne = async (request,response) => {
    var id = request.params.id;
    var event = await EventModel.findByIdAndUpdate(id,request.payload,function(err){
        console.log(err);
    });
    // await event.save(function(err){
    //     console.log(err);
    // });
    return true;   
  
};


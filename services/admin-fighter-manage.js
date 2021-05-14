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
    var fighter = new FighterModel(request.payload);
    fighter.is_active = true;
    await fighter.save();
    if(mongoose.Types.ObjectId.isValid(request.payload.requested_club_id)){
        var club_id = mongoose.Types.ObjectId(request.payload.requested_club_id);
        var club = await ClubModel.findOne({_id:club_id});
        console.log(club);
        if(club){
            club.approved_fighter_ids.push(fighter._id);
            club.save();
            fighter.approved_club_idm = club._id;
            fighter.save();
        }
    }    
    var fighters = await FighterModel.find({});
    return fighters;
};
exports.getAll = async (request,response) => {
    var fighters = await FighterModel.find({is_active:true});
    return fighters;    
};
exports.getAllForApprove = async (request,response) => {
    var fighters = await FighterModel.find({is_active:false,requested_club_id: {$exists:true}});
    var res_fighters = [];
    for(var i = 0; i < fighters.length;i++){
        var one_fighter = fighters[i].toObject();
        if(fighters[i].requested_club_idm){
            var one_club = await ClubModel.findById(fighters[i].requested_club_idm);
            if(one_club){
                one_fighter.requested_club_name = one_club.name;
            } else {
                one_fighter.requested_club_name = fighters[i].requested_club_id + ' ( other )';
            }
        } else {
            one_fighter.requested_club_name = fighters[i].requested_club_id + ' ( other )';
        }
        res_fighters.push(one_fighter);
    }
    return res_fighters;    
};
exports.deleteFighter = async (request,response) => {
    var id = request.params.id;
    var fighter = await FighterModel.findOne({_id:id});
    fighter.is_active = false;
    fighter.requested_club_id = undefined;    
    await fighter.save();
    var fighters = await FighterModel.find({is_active:true});
    return fighters;    
};
exports.approveFighter = async (request,response) => {
    var id = request.params.id;
    var fighter = await FighterModel.findOne({_id:id});
    fighter.is_active = true;
    await fighter.save();   
    if(mongoose.Types.ObjectId.isValid(fighter.requested_club_id)){
        var club_id = mongoose.Types.ObjectId(fighter.requested_club_id);
        var club = await ClubModel.findOne({_id:club_id});
        if(club){
            club.approved_fighter_ids.push(fighter._id);
            club.save();
            fighter.approved_club_idm = club._id;
            fighter.save();
        }
    }
    var fighters = await FighterModel.find({is_active:false,requested_club_id: {$exists:true}});
    var res_fighters = [];
    for(var i = 0; i < fighters.length;i++){
        var one_fighter = fighters[i].toObject();
        if(fighters[i].requested_club_idm){
            var one_club = await ClubModel.findById(fighters[i].requested_club_idm);
            if(one_club){
                one_fighter.requested_club_name = one_club.name;
            } else {
                one_fighter.requested_club_name = fighters[i].requested_club_id + ' ( other )';
            }
        } else {
            one_fighter.requested_club_name = fighters[i].requested_club_id + ' ( other )';
        }
        res_fighters.push(one_fighter);
    }
    return res_fighters;
    
};
exports.rejectFighter = async (request,response) => {
    var id = request.params.id;
    var fighter = await FighterModel.findOne({_id:id});
    fighter.is_active = false;
    await fighter.save();   
    if(mongoose.Types.ObjectId.isValid(fighter.requested_club_id)){
        var club_id = mongoose.Types.ObjectId(fighter.requested_club_id);
        var club = await ClubModel.findOne({_id:club_id});       
        if(club){
            var is_exist = false;
            var index;
            for(var i = 0; i < club.requested_fighter_ids.length;i++){
                if(String(club.requested_fighter_ids[i]) === String(fighter._id)){
                    is_exist = true;
                    index = i;
                }
            }            
            if(is_exist){
                is_success = true;               
                club.requested_fighter_ids.splice(index,1);
                fighter.is_active = false;
                fighter.requested_club_id = undefined;
                fighter.save();
                var user = await UserModel.findOne({fighter_id:fighter._id});
                if(user){
                    user.is_fighter = false;
                    user.save();
                }                
                club.save();
            }
        }       
    }
    fighter.requested_club_id = undefined;
    fighter.save();
    var fighters = await FighterModel.find({is_active:false,requested_club_id: {$exists:true}});
    var res_fighters = [];
    for(var i = 0; i < fighters.length;i++){
        var one_fighter = fighters[i].toObject();
        if(fighters[i].requested_club_idm){
            var one_club = await ClubModel.findById(fighters[i].requested_club_idm);
            if(one_club){
                one_fighter.requested_club_name = one_club.name;
            } else {
                one_fighter.requested_club_name = fighters[i].requested_club_id + ' ( other )';
            }
        } else {
            one_fighter.requested_club_name = fighters[i].requested_club_id + ' ( other )';
        }
        res_fighters.push(one_fighter);
    }
    return res_fighters;
    
};

exports.getOne = async (request,response) => {
    var id = request.params.id;
    var fighter = FighterModel.findById(id);
    return fighter;
   
};
exports.updateOne = async (request,response) => {
    var id = request.params.id;
    var fighter = await FighterModel.findByIdAndUpdate(id,request.payload);
    if(mongoose.Types.ObjectId.isValid(request.payload.requested_club_id)){
        var club_id = mongoose.Types.ObjectId(request.payload.requested_club_id);
        var club = await ClubModel.findOne({_id:club_id});
        console.log(club);
        if(club){
            club.approved_fighter_ids.push(fighter._id);
            club.save();
            fighter.approved_club_idm = club._id;
            fighter.save();
        }
    }
    
    var fighters = await FighterModel.find({is_active:true});
    return fighters;
};


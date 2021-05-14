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
exports.getAll = async (request,response) => {
    var clubs = await ClubModel.find({is_active:true});
    return clubs;    
};
exports.getClubById = async (request,response) => {
    var str_id = request.params.id;
    var club = null;
    if(mongoose.Types.ObjectId.isValid(str_id)){
        var id =mongoose.Types.ObjectId(str_id);
        club = await ClubModel.findById(id);
        if(club){
            club = club.toObject();
            for(var i = 0; i < club.requested_fighter_ids.length;i++){
                var requested_fighter = await FighterModel.findById(club.requested_fighter_ids[i]);
                if(requested_fighter){
                    club.requested_fighter_ids[i] = requested_fighter;
                }
                 
            }
            for(var i = 0; i < club.approved_fighter_ids.length;i++){
                var approved_fighter = await FighterModel.findById(club.approved_fighter_ids[i]);
                if(approved_fighter){
                    club.approved_fighter_ids[i] = approved_fighter;
                }
                 
            }
        }
    }
    return club;    
};
exports.approveFighter = async (request,response) => {
    var str_club_id = request.params.idc;
    var str_fighter_id = request.params.idf;
    var is_success = false;
    if(mongoose.Types.ObjectId.isValid(str_club_id) && mongoose.Types.ObjectId.isValid(str_fighter_id)){
        var club_id = mongoose.Types.ObjectId(str_club_id);
        var fighter_id = mongoose.Types.ObjectId(str_fighter_id);
        var club = await ClubModel.findById(club_id);
        var fighter = await FighterModel.findById(fighter_id);
        var is_exist = false;
        var index = -1;        
        if(club && fighter){
            for(var i = 0; i < club.requested_fighter_ids.length;i++){
                if(String(club.requested_fighter_ids[i]) === String(fighter._id)){
                    is_exist = true;
                    index = i;
                    console.log("here...");
                }
                console.log("here");
            }            
            if(is_exist){
                is_success = true;
                club.requested_fighter_ids.splice(index,1);
                club.approved_fighter_ids.push(fighter._id);
                fighter.approved_club_idm = fighter._id;
                fighter.is_active = true;
                fighter.save();
                var user = await UserModel.findOne({fighter_id:fighter._id});
                if(user){
                    user.is_fighter = true;
                    user.save();
                }
                club.save();
            }
        }
    }
    return {is_success: is_success};
};
exports.rejectFighter = async (request,response) => {
    var str_club_id = request.params.idc;
    var str_fighter_id = request.params.idf;
    var is_success = false;
    if(mongoose.Types.ObjectId.isValid(str_club_id) && mongoose.Types.ObjectId.isValid(str_fighter_id)){
        var club_id = mongoose.Types.ObjectId(str_club_id);
        var fighter_id = mongoose.Types.ObjectId(str_fighter_id);
        var club = await ClubModel.findById(club_id);
        var fighter = await FighterModel.findById(fighter_id);
        var is_exist = false;
        var index = -1;        
        if(club && fighter){
            for(var i = 0; i < club.approved_fighter_ids.length;i++){
                if(String(club.approved_fighter_ids[i]) === String(fighter._id)){
                    is_exist = true;
                    index = i;
                    console.log("here...");
                }
                console.log("here");
            }
            
            if(is_exist){
                is_success = true;               
                club.approved_fighter_ids.splice(index,1);
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
    return {is_success: is_success};    
};
exports.rejectFighterFromRequest = async (request,response) => {
    var str_club_id = request.params.idc;
    var str_fighter_id = request.params.idf;
    var is_success = false;
    if(mongoose.Types.ObjectId.isValid(str_club_id) && mongoose.Types.ObjectId.isValid(str_fighter_id)){
        var club_id = mongoose.Types.ObjectId(str_club_id);
        var fighter_id = mongoose.Types.ObjectId(str_fighter_id);
        var club = await ClubModel.findById(club_id);
        var fighter = await FighterModel.findById(fighter_id);
        var is_exist = false;
        var index = -1;        
        if(club && fighter){
            for(var i = 0; i < club.requested_fighter_ids.length;i++){
                if(String(club.requested_fighter_ids[i]) === String(fighter._id)){
                    is_exist = true;
                    index = i;
                    console.log("here...");
                }
                console.log("here");
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
    return {is_success: is_success};    
};

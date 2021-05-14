const UserModel = require('../models/user');
const CreditCardModel = require('../models/credit-card');
const EventModel = require('../models/event');
const FighterModel = require('../models/fighter');
const ClubModel = require('../models/club');
const bcrypt = require('bcrypt');
const Env = require('../env');
const Jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const private_key = Env.JWT_PRIVATE_KEY;
const random = require('random-number');
var mongoose = require('mongoose');
const options = {
    min:  100000, 
    max:  999999, 
    integer: true
  }
exports.getAllFighter = async (request,response) => {
    var fighters = await FighterModel.find({is_active:true});
    var res_fighters = [];
    for(var i = 0; i < fighters.length;i++){
        var one_fighter = fighters[i].toObject();
        for(var j = 0; j < one_fighter.competition_profile_list.length;j++){           
           
            if(mongoose.Types.ObjectId.isValid(one_fighter.competition_profile_list[j].against_name)){
                var id =mongoose.Types.ObjectId(one_fighter.competition_profile_list[j].against_name);
                var temp_fighter = await FighterModel.findById(id);
                if(temp_fighter){
                    one_fighter.competition_profile_list[j].against_name = temp_fighter;
                }
            }
          
        }
        // approved_club_idm
        if(one_fighter.is_active && one_fighter.id){
            if(!one_fighter.approved_club_idm){
                one_fighter.approved_club_idm = one_fighter.requested_club_id;
            }
            res_fighters.push(one_fighter);
        }
        
    }
    return res_fighters;
    
};
exports.add = async (request,response) => {
    var fighter = new FighterModel(request.payload);
    var user = await UserModel.findOne({username:request.username});    
    fighter.is_active = false;
    await fighter.save();
    if(user){
        user.is_fighter = false;
        user_fighter_id = fighter._id;
        user.save();
    }
    if(mongoose.Types.ObjectId.isValid(request.payload.requested_club_id)){
        var club_id = mongoose.Types.ObjectId(request.payload.requested_club_id);
        var club = await ClubModel.findOne({_id:club_id});
        if(club){
            club.requested_fighter_ids.push(fighter._id);
            club.save();
            fighter.requested_club_idm = club._id;
            fighter.save();
        }
    }
    
    var fighters = await FighterModel.find({is_active:true});
    return fighters;
};
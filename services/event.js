const UserModel = require('../models/user');
const CreditCardModel = require('../models/credit-card');
const EventModel = require('../models/event');
const FighterModel = require('../models/fighter');
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
  }
exports.getAllEvent = async (request,response) => {
    var events = await EventModel.find({is_active:true});
    var res_event_week = [];
    var res_event_others = [];
    var curr = new Date;
    var firstDay = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    var lastDay = new Date(curr.setDate(curr.getDate() - curr.getDay() + 7));

    for (var i = 0; i < events.length; i++){
        var event = events[i].toObject();
        for (var j = 0; j < events[i].player_list.length; j++){
            event.player_list[j].player = await FighterModel.findById(events[i].player_list[j].player);
            event.player_list[j].player_opponent =  await FighterModel.findById(events[i].player_list[j].player_opponent);
        }
        var tempDate = new Date(events[i].date);
        if(tempDate >= firstDay && tempDate < lastDay){
            // event.isThisWeek = true;
            res_event_week.push(event);
        } else {
            res_event_others.push(event);
            // event.isThisWeek = false;
        }
        // res_event.push(event);
    }
    return {
        week_event: res_event_week,
        other_event: res_event_others,
    };
};

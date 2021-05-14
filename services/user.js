const UserModel = require('../models/user');
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
const ClubModel = require('../models/club');
const options = {
    min:  100000, 
    max:  999999, 
    integer: true
  }
exports.sign_up = async (request,response) => {
    var user = new UserModel(request.payload);
    var user_email = await UserModel.findOne({email: request.payload.email});
    var user_username = await UserModel.findOne({username: request.payload.username});
    if(user_email){
        return {
            message: 'You are already Registered!',
            token: null,
        };
    }
    if(user_username){
        return {
            message: 'User name is already exist!',
            token: null,
        };
    } 
    let hash = bcrypt.hashSync(request.payload.password, 10);
    user.password = hash;
    user.is_first = true;
    user.profile_completed = false;
    user.alert_flag_1 = false;
    user.alert_flag_2 = false;
    user.alert_flag_3 = false;
    user.alert_flag_4 = false;
    user.is_fighter = false;
    await user.save(function(error){
        console.log(error);
    });
   
    return {
        message: 'Register Success!',
        token: getUserToken(user),

    };    
};
exports.login = async (request,response) => {
    var user = await UserModel.findOne({$or:[{email: request.payload.username},{username:request.payload.username}]});
    if(!user){
        return {
            message: "Username doesn't exist!",
            username: null,
            token: null,
        };
    }   
    var password = request.payload.password;
    var hash_password = user.password;    
    if (bcrypt.compareSync(password, hash_password)) {

        var club = await ClubModel.findOne ({user_id:user._id});
        var is_club = false;
        var club_id = null;
        if(club){
            is_club = true;
            club_id = club._id;
        }
        var obj_response = {
          username: user.username,          
          token: getUserToken(user),
          message: "Login Success!",
          is_first: user.is_first,
          profile_completed: user.profile_completed,
          is_club:is_club,
          club_id:club_id,
          is_fighter:user.is_fighter
        };
        user.is_first = false;
        user.save();
        return obj_response;
        
    } else {
        return {
            message: "Password is not correct!",
            username: null,
            token: null,
        };
    }
    
}; 
exports.profileSave = async (request,response) => {
    var user = await UserModel.findOne({username:request.username});
    user.full_name = request.payload.full_name;
    user.alert_flag_1 = request.payload.alert_flag_1;
    user.alert_flag_2 = request.payload.alert_flag_2;
    user.alert_flag_3 = request.payload.alert_flag_3;
    user.alert_flag_4 = request.payload.alert_flag_4;
    if(request.payload.avatar){
        user.avatar = request.payload.avatar;
    }
    try {
        var arr_card = JSON.parse(request.payload.str_card_info);
        console.log(request.payload.str_card_info);
    } catch(e) {
        console.log(e);
        return {
            message: "Saved failed!",
            is_success: false
        };
    }
    for(var i = 0; i < arr_card.length; i++){
        var temp_card = await CreditCardModel.findOne({card_no: arr_card[i].card_no});
        if(temp_card){
            continue;
        }
        var one_card = new CreditCardModel(arr_card[i]);
        await one_card.save(function(err,data){
            if(err) console.log(err);             
        });
        user.credit_card_ids.push(one_card._id);       
    }
    user.save(function(err,data){
        if(err) console.log(err);
    });
    return {
        message: "Saved Success!",
        is_success: true,
    };
    
    
};
exports.profileMainGet = async (request,response) => {
    var user = await UserModel.findOne({username:request.username});
    var res = {};    
    res.full_name = user.full_name;
    if(!user.full_name){
        res.full_name = "";
    }
    res.alert_flag_1 = user.alert_flag_1;
    res.alert_flag_2 = user.alert_flag_2;
    res.alert_flag_3 = user.alert_flag_3;
    res.alert_flag_4 = user.alert_flag_4;
    if(user.avatar){
        res.avatar = user.avatar;
    }
    res.cards = [];
    for(var i = 0; i < user.credit_card_ids.length;i++){
        var one_credit_card = await CreditCardModel.findById(user.credit_card_ids[i]);
        if(one_credit_card) {
            res.cards.push(one_credit_card);
        }
    }
    res.followed_fighters = [];
    res.followed_events = [];
    res.purchased_events = [];
    for(var i = 0; i < user.followed_fighter_ids.length;i++){
        var one_fighter = await FighterModel.findById(user.followed_fighter_ids[i]);
        if(one_fighter){
            res.followed_fighters.push(one_fighter);
        }
    }
    for(var i = 0; i < user.followed_event_ids.length;i++){
        var one_event = await EventModel.findById(user.followed_event_ids[i]);        
        if(one_event){
            var temp_event = one_event.toObject();
            for(var j = 0; j < temp_event.player_list.length;j++){
                temp_event.player_list[j].player = await FighterModel.findById(temp_event.player_list[j].player);
                temp_event.player_list[j].player_opponent = await FighterModel.findById(temp_event.player_list[j].player_opponent);
            }
            res.followed_events.push(temp_event);
        }
    }
    for(var i = 0; i < user.purchased_event_ids.length;i++){
        var one_event = await EventModel.findById(user.purchased_event_ids[i]);
        if(one_event){
            res.purchased_events.push(one_event);
        }
    }
    
    return res;   
};
exports.forgetPassword = async (request,response) => {
    var user = await UserModel.findOne({email:request.payload.email});
    if(!user){
        return {
            message: "You are not registerd!",
            verification_code: null,
            token: null,
        }
    }
    var verification_code = random(options);
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'goldmind2018@gmail.com',
          pass: '1993315pys'
        }
       
      });      
      var mailOptions = {
        from: 'ringbell app team',
        to: user.email,
        subject: 'ringbell-app activation code',
        text: verification_code.toString()
      };      
       
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {          
          return false;
        } else {
          return true;
        }
    });    
    return {
        message: "Verification Code Sent!",
        verification_code: verification_code,
        token: getUserToken(user),
    }    
};
exports.passwordReset = async (request,response) => {
    var user = await UserModel.findOne({username:request.username});
    if(!user){
        return {
            message: "Something is wrong!",
            token: {
                username: "privated",
                email: "null@co.com",
                id: -10000,
                profile_completed: user.profile_completed
            }
        }
    }
    let hash = bcrypt.hashSync(request.payload.password, 10);
    user.password = hash;
    user.save();
    return {
        message: "Password Reset Successfully!",
        token: getUserToken(user),
    }
    

};
function getUserToken(user){
    var expire_time = '1024h';
    var token_data = {
        username: user.username,
        email: user.email,
        id: user._id,
        profile_completed: user.profile_completed
    };
    return Jwt.sign({data:token_data}, private_key,{expiresIn: expire_time});            
}
exports.followFighter = async (request,response) => {
    var user = await UserModel.findOne({username:request.username});
    if(!user){
        return {
            message: "Something wrong!",
            isSuccess: false
        }
    }
    var _id = request.payload._id;
    var fighter = await FighterModel.findById(_id);
    if(!fighter){
        return {
            message: "Fighter Id is not valid",
            isSuccess: false
        } 
    }
    for(var i = 0; i < user.followed_fighter_ids.length; i++){
        if(_id == user.followed_fighter_ids[i]){
            return {
                message: "Already Followed",
                isSuccess: false
            }   
        }
    }
    user.followed_fighter_ids.push(_id);
    user.save();
    return {
        message: "Followed Success!",
        isSuccess: true
    }   

};
exports.unfollowFighter = async (request,response) => {
    var user = await UserModel.findOne({username:request.username});
    if(!user){
        return {
            message: "Something wrong!",
            isSuccess: false
        }
    }
    var _id = request.payload._id;
    var fighter = await FighterModel.findById(_id);
    if(!fighter){
        return {
            message: "Fighter Id is not valid",
            isSuccess: false
        } 
    }
    var index = -1;
    for(var i = 0; i < user.followed_fighter_ids.length; i++){
        if(_id == user.followed_fighter_ids[i]){
            index = i;   
        }
    }
    if(index == -1){
        return {
            message: "Fighter Id is not  exist!",
            isSuccess: false
        }
    } else {
        user.followed_fighter_ids.splice(index,1);
        user.save();
        return {
            message: "Success!",
            isSuccess: true
        }
    }  
    
       

};

exports.followEvent = async (request,response) => {
    var user = await UserModel.findOne({username:request.username});
    if(!user){
        return {
            message: "Something wrong!",
            isSuccess: false
        }
    }
    var _id = request.payload._id;
    var event = await EventModel.findById(_id);
    if(!event){
        return {
            message: "Event Id is not valid",
            isSuccess: false
        } 
    }
    for(var i = 0; i < user.followed_event_ids.length; i++){
        if(_id == user.followed_event_ids[i]){
            return {
                message: "Already Followed",
                isSuccess: false
            }   
        }
    }
    user.followed_event_ids.push(_id);
    user.save();
    return {
        message: "Followed Success!",
        isSuccess: true
    }   

};
exports.unfollowEvent = async (request,response) => {
    var user = await UserModel.findOne({username:request.username});
    if(!user){
        return {
            message: "Something wrong!",
            isSuccess: false
        }
    }
    var _id = request.payload._id;
    var event = await EventModel.findById(_id);
    if(!event){
        return {
            message: "Event Id is not valid",
            isSuccess: false
        } 
    }
    var index = -1;
    for(var i = 0; i < user.followed_event_ids.length; i++){
        if(_id == user.followed_event_ids[i]){
            index = i;   
        }
    }
    if(index == -1){
        return {
            message: "Event Id is not  exist!",
            isSuccess: false
        }
    } else {
        user.followed_event_ids.splice(index,1);
        user.save();
        return {
            message: "Success!",
            isSuccess: true
        }
    }  
   
       

};
exports.saveFighter = async (request,response) => {
    var user = await UserModel.findOne({username:request.username});
    var fighterUser = new FighterUserModel(request.payload);
    user.profile_completed = true;
    user.save();
    fighterUser.user_id = user._id;
    fighterUser.save();
    return {
        message: "Saved Success!",
        is_success: true,
    };    
    
};
exports.saveDeviceToken = async (request,response) => {
    var user = await UserModel.findOne({username:request.username});
    var flag = false;
    if(user.device_token){
        for(var i = 0; i < user.device_token.length;i++){
            if(user.device_token[i] == request.payload.token){
                flag = true;
            }
        }
    }
    
    if(!flag){
        user.device_token.push(request.payload.token);
        user.save();
    }   
    return {
        message: "Token Saved Success!",
        is_success: true,
    };
    
    
};
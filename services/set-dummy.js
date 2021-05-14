const UserModel = require('../models/user');
const AdminUserModel = require('../models/admin-user');
const ChatModel = require('../models/chat');
const CreditCardModel = require('../models/credit-card');
const EventModel = require('../models/event');
const FighterModel = require('../models/fighter');
const ClubModel = require('../models/club');
const LocationModel = require('../models/location');
exports.setDummy = async (request, reply) => {
    var admin_user = new AdminUserModel();
    admin_user.username = "abc";
    admin_user.email = "abc@domain.com";
    admin_user.password = "$2a$10$J8w9xe8uCmM.fuyayreDXeKuXDC5IMGaa.PCwt3B9sRB08wzEpV0u";
    admin_user.full_name = "Super Admin";
    admin_user.avatar = "fighter_avatar_5.png";
    admin_user.save();
    
     
};
exports.setLocation = async (request, reply) => {    
     var location = new LocationModel(request.payload);
     location.save();
     return {
        message: "Location Saved Success!"
     };
};
exports.setFighter = async (request, reply) => {    
    var fighter = new FighterModel(request.payload);
    fighter.save();
    return {
       message: "Fighter Saved Success!"
    };
};
exports.deleteChat = async (request, reply) => {   
    ChatModel.find({}).remove().exec();
    return {
       message: "Chat Deleted All!"
    };
};
exports.deleteAllData = async (request, reply) => {   
    ChatModel.find({}).remove().exec();
    UserModel.find({}).remove().exec();
    ClubModel.find({}).remove().exec();
    FighterModel.find({}).remove().exec();
    LocationModel.find({}).remove().exec();
    ClubModel.find({}).remove().exec();
    CreditCardModel.find({}).remove().exec();
    EventModel.find({}).remove().exec();
    return {
       message: "Deleted All!"
    };
};
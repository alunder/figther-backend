const Jwt = require('jsonwebtoken');
const Env = require('../env');
const UserModel = require('../models/user');
const ChatModel = require('../models/chat');
const EventModel = require('../models/event');
const privateKey = Env.JWT_PRIVATE_KEY;
var Users = [];
var Events = [];

exports.newConnection = async(socket) => {
    if(Events.length == 0){
        await init();
    }
    var token = socket.handshake.query.token;
    var flag = true;
    var username;
    if(token){
        var data =  await Jwt.verify(token, privateKey, function(err, decoded) {
            if (err) {
                return false;
            }
            else {
                
                return (decoded.data);
            }
        });
        if(data){
            var user = await UserModel.findOne({ username: data.username});
            if(user){
                username = data.username;
            } else {
                flag = false;
            }
        } else {
            flag = false;
        }
    } else {
        flag = false;
    }
    if(flag){
        socket.emit('event', Events);    
    } else {  
        console.log("Token Invalid");
    }    
}
async function init() {
    console.log("Init Chat Service");
    Events = [];
    Events = await EventModel.find({is_active:true});
}
exports.join = async(data,socket) =>{    
    socket.join(data.id);
    socket.emit('get message', await getOldMessages(data.id));
    console.log("Join!");    
}
exports.leave = async(data,socket) =>{    
    socket.leave(data.id);
    console.log("Leave!");

}
exports.disconnection = function() {
    console.log('Disconnection!');   

}
exports.sendMessage = async(data,socket) => {
    var chat = new ChatModel();
    chat.id = data.id;
    chat.text = data.text;
    chat.user._id  = data.user._id;
    chat.createdAt = data.createdAt;
    if(data.user.name){
        chat.user.name = data.user.name;
    }
    if(data.user.avatar){
        chat.user.avatar = data.user.avatar;
    }
    await chat.save();
    socket.to(data.id).emit('get message', [data]);     
}
async function getOldMessages(room_id){
     
    var old_message = await ChatModel.find( {"id" : room_id});
    var messages = [];
    for(var i = 0; i < old_message.length;i++){
       one_message = old_message[i].toObject();
       messages.push({
           _id: one_message._id,
           id: one_message.id,
           text:one_message.text,
           createdAt: one_message.createdAt,
           user:{
               _id: one_message.user._id,
               name: one_message.user.name,
               avatar: one_message.user.avatar
           }
       });        
    }
    return messages;
} 
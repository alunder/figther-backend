
const Jwt = require('jsonwebtoken');
const Env = require('../env');
const UserModel = require('../models/user');
const ChatModel = require('../models/chat');
const privateKey = Env.JWT_PRIVATE_KEY;
var Users = [];

exports.newConnection = async(socket) => {
   
   if(Users.length == 0){
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
        await setSocket(username,socket.id);
        socket.broadcast.emit('users', Users);
        socket.emit('users', Users);    
    } else {
    //    socket.emit('error', {
    //        message: "Token Invalid!"
    //    });
    }    

}
exports.sendMessage = async(data,socket) => {
    var user = getUserById(data.user._id);
    // console.log(data);
    // console.log(Users);
    // console.log(user);
    var chat = new ChatModel();
    chat.id = data.id;
    chat.text = data.text;
    chat.user._id  = data.user._id;
    chat.createdAt = data.createdAt;
    await chat.save();
    if(user.is_online){
        if(user.join_with == data.id){        
            chat.unread = false;
            chat.save();
            data._id = chat._id;
            socket.broadcast.to(user.socket_id).emit('get message', [data]);
        } else {            
            chat.unread = true;
            await chat.save();
            await updateUnreadMessage();
            socket.broadcast.to(user.socket_id).emit('users', Users);
        }
    } else {            
            chat.unread = true;
            chat.save();            
    }     
}
exports.join = async(data,socket) =>{    
     setJoin(data.id,data.user._id,socket.id);
     socket.emit('get message', await getOldMessages(data.id,data.user._id));

}
exports.leave = async(data,socket) =>{    
     setLeave(data.id,data.user._id,socket.id);
}

exports.disconnection = function() {
    unsetSocket(this.id);
    this.broadcast.emit('users', Users);
    console.log('Disconnection!');   

}
function getUserById(id){   
    for(var i =0; i < Users.length;i++){       
        if(Users[i]._id == id) return Users[i];
    }
    return null;
}
function setJoin(from, to,socket_id){
    for(var i = 0; i < Users.length;i++){
        if(Users[i]._id == from && Users[i].socket_id == socket_id){
            Users[i].join_with = to;
            return;
        }
    }
    console.log("Join " + from);
}
function setLeave(from, to, socket_id){
    for(var i = 0; i < Users.length;i++){
        if(Users[i]._id == from && Users[i].socket_id == socket_id && Users[i].join_with == to){
            Users[i].join_with = null;
            return;
        }
    }
    console.log("Leave " + from);
}
async function init() {
    // console.log("Init Chat Service");
    Users = [];
    var users  =  await UserModel.find({});
    for(var i = 0;  i < users.length; i++){
        var full_name;
        var avatar;
        if(users[i].full_name){
            full_name = users[i].full_name;
        } else {
            full_name = null;
        }
        if(users[i].avatar){
            avatar = users[i].avatar;
        } else {
            avatar = null;
        }
        var num_unread = await ChatModel.count({"user._id": users[i]._id,unread: true});
        Users.push({
            username: users[i].username,
            full_name: full_name,
            avatar: avatar,
            is_online: false,
            socket_id: null,
            _id:users[i]._id.toString(),
            join_with: null,
            num_unread:num_unread
        });
    }
}
async function updateUnreadMessage(){
    for(var i =0 ; i < Users.length;i++){
        var num_unread = await ChatModel.count({"user._id": Users[i]._id,unread: true});
        Users[i].num_unread = num_unread;
    }
}
async function setSocket(username, socket_id){
    for(var i = 0; i < Users.length;i++){
        if(Users[i].username == username){
            Users[i].is_online = true;
            Users[i].socket_id = socket_id;
           
        }
    }
    var users = await UserModel.find({});
   
    for(var i = 0; i < users.length;i++){
        if(getIndexOfUser(users[i]._id) != null){
            if(users[i].avatar){
                Users[getIndexOfUser(users[i]._id)].avatar = users[i].avatar;
            }
            if(users[i].full_name){
                Users[getIndexOfUser(users[i]._id)].full_name = users[i].full_name;
            }
            
            
        } else {
            var full_name;
            var avatar;
            var num_unread = await ChatModel.count({"user._id": users[i]._id,unread: true});
            if(users[i].avatar){
                avatar = users[i].avatar;
            } else {
                avatar = null;
            }
            if(users[i].full_name){
                full_name = users[i].full_name;
            } else {
                full_name = null;
            }
            Users.push({
                username: users[i].username,
                full_name: full_name,
                avatar: avatar,
                is_online: false,
                socket_id: null,
                _id:users[i]._id.toString(),
                join_with: null,
                num_unread:num_unread
            });
        } 
    }
}
function getIndexOfUser(id){
    for(var i =0; i < Users.length; i++){
        if(id == Users[i]._id){
            return i;
        }
    }
    // console.log(id);
    return null;
}
function unsetSocket(socket_id){
    for(var i = 0;  i < Users.length; i++){
        if(Users[i].socket_id == socket_id){
            Users[i].socket_id = null;
            Users[i].is_online = false;
            Users[i].join_with = null;
            return;
        }
    }
}
function getSocketId(id){
    for(var i = 0; i < Users.length ; i++){
        if(Users[i]._id == id){
            return Users[i].socket_id;
        }
    }
    return null;
}
function getUserId(socket_id){
    for(var i = 0; i < Users.length;i++){
        if(Users[i].socket_id == socket_id){
            return Users[i]._id;
        }
    }
    return null;
}
async function getOldMessages(id, another_id){
     
     var old_message = await ChatModel.find( { $or:[ {id :id,"user._id": another_id },{id :another_id,"user._id": id}  ]});
    //  var old_message = await ChatModel.find( {id :id,"user._id": another_id});
    //  console.log(old_message.length);
     ChatModel.update({ "user._id": id}, { $set: { unread: false }}, {multi: true});
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
            }
        });        
     }
     return messages;
} 

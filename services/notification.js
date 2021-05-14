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
var CronJob = require('cron').CronJob;
var FCM = require('fcm-node');
var serverKey = ''; //put your server key here
var fcm = new FCM(serverKey);
const options = {
    min:  100000, 
    max:  999999, 
    integer: true
  }
exports.initCronJob = async (request,response) => {
    new CronJob('00 00 08 * * *', async() => {
        var users = await UserModel.find({});
        var device_tokens = [];
        for( var i = 0; i < users.length;i++){
            for(var j = 0; j < users[i].device_token.length; j++){
                device_tokens.push(users[i].device_token[j]);
            }
        }
        console.log("device Token!");       
        console.log(device_tokens);
        // registration_ids
        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            // to: 'registration_token', 
            // collapse_key: 'your_collapse_key',
            registration_ids: device_tokens,
            
            notification: {
                title: 'Ringbell App', 
                body: 'Test Notification Here!' 
            },
            
            // data: {  //you can send only notification or only data(or include both)
            //     my_key: 'my value',
            //     my_another_key: 'my another value'
            // }
        };
        
        fcm.send(message, function(err, response){
            if (err) {
                console.log("Something has gone wrong!",err);
            } else {
                console.log("Successfully sent with response: ", response);
            }
        });

    }, null, true, 'Europe/Madrid');
};

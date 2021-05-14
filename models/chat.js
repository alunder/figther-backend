const Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

let ChatModel; // eslint-disable-line prefer-const
const ChatSchema = new Schema({
    id: { type : String},//event_id
    text: {type: String, required: true},
    createdAt: {type: Date, required: true},
    user: { 
        _id: { 
            type:String
        },
        name: { 
            type:String
        },
        avatar: { 
            type:String
        }
    },    
    unread: { type: Boolean},
    is_active:{type:Boolean,default:true}     

},{usePushEach:true});
ChatSchema.index({_id: 1}, {unique: true});
ChatModel = Mongoose.model('Chat', ChatSchema, 'Chat');

module.exports = ChatModel;
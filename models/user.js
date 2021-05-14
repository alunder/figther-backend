const Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

let UserModel; // eslint-disable-line prefer-const
const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required :true, unique: true},
    password: {type: String, required: true},
    profile_completed: {type:Boolean,required: true },
    is_first: { type: Boolean, required: true},
    credit_card_ids:[{ type : Schema.Types.ObjectId, ref: 'CreditCard'}],
    followed_event_ids:[{ type : Schema.Types.ObjectId, ref: 'Event'}],
    purchased_event_ids:[{ type : Schema.Types.ObjectId, ref: 'Event'}],
    followed_fighter_ids:[{ type : Schema.Types.ObjectId, ref: 'Fighter'}],
    device_token: [{ type: String}],
    full_name: { type: String },
    avatar: {type: String},
    alert_flag_1: {type:Boolean},
    alert_flag_2: {type: Boolean},
    alert_flag_3: {type: Boolean},
    alert_flag_4: {type: Boolean},
    is_active:{type:Boolean,default:true},
    is_fighter: {type:Boolean,default:false},
    fighter_id:{ type : Schema.Types.ObjectId, ref: 'Fighter'}  

},{usePushEach:true});
UserSchema.index({username: 1}, {unique: true});
UserSchema.index({email: 1}, {unique: true});
UserModel = Mongoose.model('User', UserSchema, 'User');

module.exports = UserModel;
const Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

let FighterUserModel; // eslint-disable-line prefer-const
const FighterUserSchema = new Schema({
    organization: {type: String},
    main_type: { type: String, enum: ["", "", "",""], required: true },
    weight: { type: Number, required: true },  
    win_num: { type: Number, required: true },
    fail_num: { type: Number, required: true},
    equal_num: { type: Number, required: true},
    ko_num: { type: Number, required: true},   
    stadium:{type: String},
    user_id: { type : Schema.Types.ObjectId, ref: 'User'},
    is_active:{type:Boolean,default:true}     
},{usePushEach:true});
FighterUserSchema.index({_id: 1}, {unique: true});
FighterUserModel = Mongoose.model('FighterUser', FighterUserSchema, 'FighterUser');
module.exports = FighterUserModel;
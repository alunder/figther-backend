const Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

let FighterModel; // eslint-disable-line prefer-const
const FighterSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: {type: String, required: true},
    avatar: [{ type: String}],
    main_type: { type: String, enum: ["", "", "",""], required: true },
    birthday: {type: Date},
    gender: { type: String, enum: ["", ""], required: true},
    weight: { type: Number, required: true },
    level: { type: String,required: true },
    win_num: { type: Number, required: true },
    fail_num: { type: Number, required: true},
    equal_num: { type: Number, required: true},
    ko_num: { type: Number},
    image_list:[{ type: String}],
    approved_club_idm: { type : Schema.Types.ObjectId, ref: 'Club'},
    requested_club_idm: { type : Schema.Types.ObjectId, ref: 'Club'},
    requested_club_id: {type: String},
    is_active:{type:Boolean,default:true},     
    stadium: {
        image: String,
        name: String,
        location: String
    },
    competition_profile_list:[{
        earned: String,
        against_name: String,
        rival: String,
        name_velada:String,
        date: Date,
    }],
    championship_list: [{
        name: String,
        description: String,
    }],
},{usePushEach:true});
FighterSchema.index({_id: 1}, {unique: true});
FighterModel = Mongoose.model('Fighter', FighterSchema, 'Fighter');
module.exports = FighterModel;
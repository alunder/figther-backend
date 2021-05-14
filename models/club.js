const Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

let ClubModel; // eslint-disable-line prefer-const
const ClubSchema = new Schema({
    name: { type: String, required: true },
    contact_email: {type: String, required: true},
    contact_phone: {type: String, required: true},
    address: {type:String, required: true},
    modality_type: [{type:String}],
    logo:{type:String},
    user_id: { type : Schema.Types.ObjectId, ref: 'User'},
    is_active:{type:Boolean,default:true},  
    requested_fighter_ids:[{ type : Schema.Types.ObjectId, ref: 'Fighter'}],
    approved_fighter_ids:[{ type : Schema.Types.ObjectId, ref: 'Fighter'}],
       
},{usePushEach:true});
ClubSchema.index({_id: 1}, {unique: true});
ClubModel = Mongoose.model('Club', ClubSchema, 'Club');
module.exports = ClubModel;
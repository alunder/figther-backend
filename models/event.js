const Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

let EventModel; // eslint-disable-line prefer-const
const EventSchema = new Schema({
    name: { type: String, required: true },
    location: {type :String, required: true},
    location_name: {type :String},
    date: { type: Date, required:true },
    price_list: [{
        position: String,
        price: Number,
    }],
    avatar: {type: String, required: true},
    notes: { type: String},
    player_list: [{
        player: Schema.Types.ObjectId,
        player_opponent:Schema.Types.ObjectId 
    }],
    is_active:{type:Boolean,default:true}  
    
},{usePushEach:true});
EventSchema.index({_id: 1}, {unique: true});
EventModel = Mongoose.model('Event', EventSchema, 'Event');
module.exports = EventModel;
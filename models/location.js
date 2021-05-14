const Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

let LocationModel; // eslint-disable-line prefer-const
const LocationSchema = new Schema({
    name: { type: String, required: true },
    is_active:{type:Boolean,default:true}     
});
LocationSchema.index({_id: 1}, {unique: true});
LocationModel = Mongoose.model('Location', LocationSchema, 'Location');
module.exports = LocationModel;
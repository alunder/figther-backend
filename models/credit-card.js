const Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

let CreditCardModel; // eslint-disable-line prefer-const
const CreditCardSchema = new Schema({
    card_no: { type: String, required: true, unique: true },
    full_name: { type: String, required: true },
    expired_date: { type: Date, required: true },
    cvc_code: { type: String, required: true},
    is_active:{type:Boolean,default:true}     
});
CreditCardSchema.index({card_no: 1}, {unique: true});
CreditCardModel = Mongoose.model('CreditCard', CreditCardSchema, 'CreditCard');
module.exports = CreditCardModel;
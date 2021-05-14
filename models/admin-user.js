const Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

let AdminUserModel; // eslint-disable-line prefer-const
const AdminUserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required :true, unique: true},
    password: {type: String, required: true},   
    full_name: { type: String },
    avatar: {type: String},
    is_active:{type:Boolean,default:true}  

},{usePushEach:true});
AdminUserSchema.index({username: 1}, {unique: true});
AdminUserSchema.index({email: 1}, {unique: true});
AdminUserModel = Mongoose.model('AdminUser', AdminUserSchema, 'AdminUser');

module.exports = AdminUserModel;
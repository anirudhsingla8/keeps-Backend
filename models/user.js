const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    date : {type:Date,default:Date.now}
});
const User = mongoose.model('users',userSchema);

function register_validation(data){
    const schema = {
        firstname:Joi.string().required(),
        lastname:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(8).required().strict(),
        confirm_password:Joi.string().valid(Joi.ref('password')).required().strict()
    }
    return Joi.validate(data,schema);
}

function login_validation(data){
    const schema = {
        email:Joi.string().email().required(),
        password:Joi.string().required(),
    }
    return Joi.validate(data,schema);
}

module.exports ={
    User,
    register_validation,
    login_validation
}
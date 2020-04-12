const _ = require('lodash');
const express = require('express');
const router = express.Router();
const {User,register_validation,login_validation} = require('../models/user');

router.get('/', async (req,res) => {
    const users = await User.find().sort('email');
    res.send(users);
})

router.post('/register',async (req,res) => {
    const result = register_validation(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('User Already registered')

    user = new User(_.pick(req.body,['firstname','lastname','email','password']))

    // user = new User({
    //     firstname: req.body.firstname,
    //     lastname: req.body.lastname,
    //     email: req.body.email,
    //     password: req.body.password
    // });

    user.save()
        .then(() => res.send("User Successfully Registered"))
        .catch(err => res.send(err.message));
    // try{
    //     const users = await user.save();
    //     res.send(users);
    // }catch (error) {
    //     res.send(error.message);
    // }
});

router.post('/login',async (req,res) => {
    const result = login_validation(req.body);
    if (result.error){
        res.send(result.error.details[0].message)
        return;
    }
    else {
        try{
             const users = await User.find({
                 email: req.body.email,
             });
             if (users[0] && users[0].password==req.body.password) res.send(users[0])
             else if(users[0] && users[0].password!=req.body.password) res.send("Please enter correct password")
             else res.send("User does not exist, Please register")
         }catch (error) {
             res.send(error.message);
         }
    }
})

module.exports = router;

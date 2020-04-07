const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const {UserItem,validItem} = require('../models/useritems')

router.get('/:id?', async (req,res) => {
    try{
        const result = await UserItem.find({userId:req.params.id})
        if(result.length) {
            res.status(200).send(result)
        }
        else res.send("no record found with this User")
    }catch (error) {
        console.log('error', error)
        res.status(400).send(error.message)
    }
});

router.post('/add', async (req,res) => {
    const result = validItem(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    else{
        const userItem = new UserItem({
            userId: req.body.userId,
            item: req.body.item
        })
        try{
            const result = await User.findOne({_id:req.body.userId})
            if(result) {
                await userItem.save()
                res.status(200).send("record successfully added")
            }
            else res.send("no user found with this ID")
        }catch (error) {
            console.log('error', error)
            res.status(400).send(error.message)
        }
    }
});

router.put('/update/:id',async (req,res)=>{
    const result = validItem(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    else{
        const userItem = await UserItem.findOne({_id:req.params.id})
        try{
            if (userItem.userId==req.body.userId){
                userItem.item = req.body.item
                await userItem.save()
                res.status(200).send('record successfully updated')
            }else{
                res.send('sorry you are not authorised to update this record');
            }
        }catch (error) {
            res.status(400).send(error.message)
        }
        res.send(userItem);
    }
});

router.delete('/delete/:id',async (req,res)=>{
    const result = validItem(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    else{
        const userItem = await UserItem.findOne({_id:req.params.id})
        try{
            if (userItem.userId==req.body.userId){
                await userItem.deleteOne()
                res.status(200).send('record successfully deleted')
            }else{
                res.send('sorry you are not authorised to delete this record')
            }
        }catch (error) {
            res.status(400).send(error.message)
        }
        res.send(userItem)
    }
    // try{
    //     const result = await UserItem.findOne({_id:req.params.id})
    //     res.status(200).send(req.body.userId)
    // }catch (error) {
    //     res.status(400).send(error.message)
    // }
})

module.exports = router;
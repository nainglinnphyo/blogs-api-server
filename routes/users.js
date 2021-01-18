const express = require('express');
const {User} = require('../models/user')
const router = express.Router();
const bcrypt = require('bcryptjs')

router.get(`/`, async (req, res) =>{
    const userList = await User.find();

    if(!userList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(userList);
  
});

router.post('/', async (req,res)=>{
    let user = new User({
        username: req.body.username,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
    })

    user = await user.save();

    if(!user)
    return res.status(400).send('the user cannot be created!')

    res.send(user);
});


module.exports =router;
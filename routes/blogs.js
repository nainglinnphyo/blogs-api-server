const express = require('express');
const {Blog} = require('../models/blog')
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const blogsList = await Blog.find().populate('user','username').populate('category','name');

    if(!blogsList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(blogsList);
  
});

router.post('/', async (req,res)=>{
    let blog = new Blog({
        title: req.body.title,
        body: req.body.body,
        category:req.body.category,
        user:req.body.user,
        image: req.body.image
    })

    blog = await blog.save();

    if(!blog)
    return res.status(400).send('the blog cannot be created!')

    res.send(blog);
});


module.exports =router;
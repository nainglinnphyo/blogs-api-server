const express = require('express');
const {Category} = require('../models/category')
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const catesList = await Category.find();

    if(!catesList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(catesList);
  
});

router.post('/', async (req,res)=>{
    let category = new Category({
        name: req.body.name,
    })

    category = await category.save();

    if(!category)
    return res.status(400).send('the category cannot be created!')

    res.send(category);
});


module.exports =router;
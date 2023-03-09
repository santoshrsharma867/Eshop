const express = require('express');
const router= express.Router();
const Category= require('../model/category') 

router.get('/',async(req,res)=>{
  const category = await Category.find();
  if(!category){
    res.status(500).json({
        error:'there are no category'
    })
  }

  res.status(200).json({
      data:category
  })
})


router.get('/:id',async(req,res)=>{
    const category = await Category.findById(req.params.id)



    if(!category){
      res.status(500).json({
          error:'there are no category'
      })
    }
  
    res.status(200).json({
        data:category
    })
  })


  router.put('/:id',async(req,res)=>{
    const category = await ProductModel.findByIdAndUpdate(req.params.id,
        {
        name:req.body.name,
        color:req.body.color,
        icon:req.body.icon,
        image:req.body.image
        }

    )
    if(!category){
      res.status(500).json({
          error:'there are no category'
      })
    }
  
    res.status(200).json({
        data:category
    })
  })

  router.delete('/:id',async(req,res)=>{
    const category = await Category.findByIdAndRemove(req.params.id)
    if(!category){
      res.status(500).json({
          error:'there are no category'
      })
    }
  
    res.status(200).json({
        data:category
    })
  })



  router.post('/',async(req,res)=>{
    console.log(req.body);
    const category = await Category({
        name:req.body.name,
        color:req.body.color,
        icon:req.body.icon,
        image:req.body.image

    })
    category.save().then((result) => {
        res.status(200).json({
            data: result
        })
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    })
  })

module.exports=router;

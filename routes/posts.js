const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const verifyToken = require('../verifyToken')

router.post('/', verifyToken, async(req,res)=>{
    const postData = new Post({
        title:req.body.title,
        description:req.body.description,
        createdBy:req.userId
     })

    try{
        const postToSave = await postData.save()
        res.send(postToSave)
    }catch(err){
        res.send({message:err})
    }
})

router.get('/', async(req,res) =>{
    try{
        const getPosts = await Post.find()
        res.send(getPosts)
    }catch(err){
        res.send({message:err})
    }
})

router.get('/:postId', async(req,res) =>{
    try{
        const getPost = await Post.findById(req.params.postId)
        res.send(getPost)
    }catch(err){
        res.send({message:err})
    }
})

router.patch('/:postId', verifyToken, async(req,res) =>{
    try{
        const updatePostById = await Post.updateOne(
            {_id:req.params.postId},
            {$set:{
                title:req.body.title,
                description:req.body.description,
                }
            })
        res.send(updatePostById)
    }catch(err){
        res.send({message:err})
    }
})

router.delete('/:postId', verifyToken, async(req,res)=>{
    try{
        const deletePostById = await Post.deleteOne({_id:req.params.postId})
        res.send(deletePostById)
    }catch(err){
        res.send({message:err})
    }
})

module.exports = router

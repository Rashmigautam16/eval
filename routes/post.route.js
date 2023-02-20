const express = require('express');
const {postModel}=require("../model/post.model")

const postRoute=express.Router()


postRoute.get("/", async(req, res) => {
    const user=req.body.userID
    try{
        const allpost=await postModel.find({user})
        res.send(allpost,"getting data")
    }catch(err){
        res.send({"msg":"error getting user"})
    }
})

postRoute.post("/top", async(req, res) => {
    const post=req.body
    try{
        const newpost=new postModel(post)
       await newpost.save()
       res.send({"msg":"post successfully"})
    }catch(err){
        res.send({"msg":"error getting user"})
    }
})

postRoute.patch("/update/:id", async(req, res) => {
    const id=req.params.id
    const payload=req.body;
    try{
       await postModel.findByIdAndUpdate({_id:id}, payload)
        res.send({"msg":`Note with id:${id} updated`})
    }catch(err){
        res.send({"msg":"error getting user"})
    }
})

postRoute.delete("/delete/:id", async(req, res) => {
    const id=req.params.id
    const data=await postModel.findOne({_id:id})
    try{
        await postModel.findByIdAndDelete({_id:id})
        res.send({"msg":"post deleted"})
    }catch(err){
        res.send({"msg":"error getting user"})
    }
})

module.exports={
    postRoute
}
const express=require("express")
const {userModel}=require("../model/user.model")
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const userRoute= express.Router()


userRoute.post("/register", async(req, res)=>{
    const {name, email,gender ,password , age ,city }=req.body;
    try{
       
        bcrypt.hash(password, 5, async(err, hash)=>{
            if(err){
                res.send({"msg":"Something went wrong", "error":err.message})
            }else{
                const user=new userModel({name, email, gender,age,city, password:hash})
                await user.save()
                res.send({"msg":"new user has been created"})
            }
        })

    }catch(err){
        res.send({"msg":"user is not registered"})
    }
})


userRoute.post("/login", async(req, res)=>{
    const { email ,password }=req.body;
    try{
       const user= await userModel.find({email})
       if(user.length > 0){
           bcrypt.compare(password, user[0].pass, async(err, result)=>{
               if(result){
                let token=jwt.sign({userID:user[0]._id}, "masai")
                   res.send({"msg":"login successfull", "token":token})
               }else{
                   res.send({"msg":"Somthing went wrong"})
                   console.log(err)
               }
           })
       }else{
          res.send({"msg":"wrong credentials"})
       }

    }catch(err){
        res.send({"msg":"user is not registered"})
    }
})

module.exports={
    userRoute
}
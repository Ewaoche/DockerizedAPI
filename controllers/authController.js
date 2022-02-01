const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const signUp = async (req, res, next) => {
    try {
        const newUser = await User.create({
            username:req.body.username,
            password:req.body.password
        });
        req.session.user = newUser;

        return res.status(201).json({
            status:"success",
             data:newUser
        })
     
    } catch (error) {
        res.status(400).json({
            status:"error",
            message:"error occured"
        })
    }
}
const signIn = async (req, res, next) => {
    // const {username, password } = require(req.body);
        const username = req.body.username;
        try{
            const user = await User.findOne({username});
            if(user){
                req.session.user = user;
             return   res.status(200).json({
                    status:'success',
                    data:user
                })
            }   
        }

    catch(err){
        res.status(400).json({
            status:'fail',
            meassage:"error occured"
        })
    }
}



module.exports = {
   signUp,
   signIn
}
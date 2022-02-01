const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: [true, "User must have a username"]
      

    },

    password:{
        type:String,
        required:[true, "User must have a password"]
    }
});
//Encrypt password using bcrypt
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model("User", userSchema);
module.exports = User;
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    

},{
    timestamps: true
});

const Register =  new mongoose.model("Register",userSchema);
module.exports = Register;
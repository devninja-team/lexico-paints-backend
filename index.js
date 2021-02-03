const express = require("express");
const app = express();
require("./src/db/connection");
const Register = require("./src/models/register");
var cors = require('cors')
const jwt = require('jsonwebtoken');
const _PORT = 3001;
const SECURE_TOKEN = "DEVNINJA";


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const verifyAuth = async (req, res, next) => {
    const token = req.headers["authorization"];
    try {
        await jwt.verify(token,SECURE_TOKEN,(error, data) => {
            if(error) {
                res.json({
                    message:"invaid token"
                });
            } else {
                next();
            }
        })
    }catch(error) {
        console.log(error);
    }
}

//access routes
app.get("/",(req,res) => {
    res.send("Get called");
});

//register routes
app.post("/register", async (req, res) => {
    try {
        const user = new Register({
            username: req.body.username,
            password: req.body.password,
            gender: req.body.gender
        });

        await user.save();
        res.status(200).json({
            message:"user registered"
        })
        
    }catch(error) {
        console.log("error while fetching body")
    }
});

app.post("/auth/login",async (req, res) => {
    try {
        await Register.findOne({username:req.body.username, password:req.body.password}, async (error, data) => {
            if(error) {
                console.log("error",error);
            } else {
                if(data) {
                    console.log(data)
                    const token = await jwt.sign({user:req.body.username}, SECURE_TOKEN, {expiresIn:'1h'});
                    res.status(200).json({
                        message:"login success",
                        token,
                        role:"user",
                        status:200
                    })
                }else {
                    res.status(200).json({
                        message:"Username or password not valid",
                        status: 200
                    })
                }
            }
        });
    }
    catch(error) {
        console.log(error)
    }
});


app.post("/auth/logout",verifyAuth,(req, res) => {
    res.status(200).json({
        message:"logout success",
        status:200
    })
})

app.get("*",(req, res) => {
    res.status(404).json({
        message:"not found"
    })
})

app.listen(_PORT,() => {
    console.log(`server running on ${_PORT}`);
})
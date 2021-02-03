const mongoose = require("mongoose");
const URL = "mongodb://localhost:27017/lexicopaints";

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("connection success!");
}).catch((error) => {
    console.log("connection error", error);
} )
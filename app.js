import bodyParser from "body-parser";
import express from "express";
import ejs from "ejs";
import env from "dotenv"
import mongoose from "mongoose";

const app = express()
env.config()

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.render("home")
})

app.get("/login", function(req, res){
    res.render("login")
})

app.get("/register", function(req, res){
    res.render("register")
})

app.listen(process.env.port, function(){
    console.log("Server started on port 3000")
})

mongoose.connect(process.env.connectMongoose, {useNewUrlParser: true})

const userSchema = {
    email: String,
    password: String
}

const User = new mongoose.model("User", userSchema)

app.post("/register", function(req, res){
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });

    newUser.save().then(() => {
        res.render("secrets");
    }).catch((err) => {
        console.log(err);
    })
})

app.post("/login", function (req, res){
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email: username}).then((userFound) =>{
        if(userFound){
            if(userFound.password === password){
                res.render("secrets")
            }else{
                console.log("login error")
            }
        }else{
            res.render("/login")
            console.log("login error")
        }
    }).catch((err)=>{
        console.log(err)
    });
})
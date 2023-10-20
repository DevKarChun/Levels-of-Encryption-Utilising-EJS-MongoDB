//Bcrypt hashing

import bodyParser from "body-parser";
import express from "express";
import ejs from "ejs";
import env from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const app = express()
env.config()

const saltRounds = 10;

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

const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

app.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      const newUser = new User({
        email: req.body.username,
        password: hash,
      })
      newUser
        .save()
        .then(() => {
          console.log('Successfully created a new user!')
          res.render('secrets')
        })
        .catch((err) => {
          console.error(err.message)
        })
    })
  })

app.post("/login", function (req, res){
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email: username}).then((userFound) =>{
        bcrypt.compare(password, userFound.password, function(err, result){
            if(result === true){
                res.render("secrets")
            }
        })
    });
})
//Passport.js & Cookies and Sessions

import bodyParser from "body-parser";
import express from "express";
import ejs from "ejs";
import env from "dotenv";
import mongoose from "mongoose";
import session from "express-session"
import passport from "passport"
import passportLocalMongoose from "passport-local-mongoose"

const app = express()
env.config()

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: process.env.secretForDatabase,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


app.get("/", function(req, res){
    res.render("home")
})

app.get("/login", function(req, res){
    res.render("login")
})

app.get("/register", function(req, res){
    res.render("register")
})

app.get("/secrets", function(req, res){
    if (req.isAuthenticated()){
        res.render("secrets")
    } else {
        res.redirect("/login")
    }
})

app.get("/logout", function(req, res, next){
    req.logout(function (err){
        if (err){
            return next (err);
        } else {
            res.redirect("/")
        }
    });
})


app.listen(process.env.port, function(){
    console.log("Server started on port 3000")
})

mongoose.connect(process.env.connectMongoose, {useNewUrlParser: true})
// mongoose.set("useCreateindex", true);

const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema)
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.post("/login", function(req, res){
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, function(err){
        if(err){
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            });
        }
    })

});


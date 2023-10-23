//Passport.js & Cookies and Sessions

import bodyParser from "body-parser";
import express from "express";
import ejs from "ejs";
import env from "dotenv";
import mongoose from "mongoose";
import session from "express-session"
import passport from "passport"
import passportLocalMongoose from "passport-local-mongoose"
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import findOrCreate from "mongoose-findorcreate"
import { Strategy as FacebookStrategy } from "passport-facebook";

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

app.get("/auth/google", function(req, res){
    passport.authenticate("google", {scope: ['profile']})(req, res);
});

app.get("/auth/google/secrets", 
    passport.authenticate("google", {scope: ['profile']}),
    function(req, res){
        res.redirect("/secrets");
    }
);

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/secrets',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/secrets');
  });

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
    password: String,
    googleId: String,
    facebookId: String
})

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema)
passport.use(User.createStrategy());
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        if (user) {
            done(null, user);
        } else {
            done(null, false); // or an error, depending on your requirements
        }
    } catch (err) {
        done(err, null);
    }
});

passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.clientCallbackURL,
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.use(new FacebookStrategy({
    clientID: process.env.facebookId,
    clientSecret: process.env.facebookSecret,
    callbackURL: process.env.facebookCallbackURL
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

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

app.post("/register", function(req, res){
    User.register({username: req.body.username}, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.redirect("/register");
        }else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            });
        }
    });
});
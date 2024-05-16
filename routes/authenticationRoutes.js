const express = require("express");
const router = express.Router();
const passport = require("passport");

// Import model
const AdminRegister = require('../models/AdminRegister');

// Admin Registration route
router.get('/registerAdmin', (req, res) => {
    res.render('adminRegistration');
});

router.post('/registerAdmin', async(req, res) => {
    try {
        const adminRegister = new AdminRegister(req.body);
        console.log(adminRegister)
        await AdminRegister.register(adminRegister, req.body.password, (error) => {
            if(error){
                throw error
            }
            res.redirect("/registerAdmin")
        })
    } catch (error) {
        res.status(400).send("User not registered")
        console.log(error)
    }
});

// Login route
router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("local",{failureRedirect: "/login"}), (req,res) => {
    console.log(req.body);
    req.session.user = req.user
    res.redirect("/adminDash");
});

// Logout route
router.get("/logout", (req,res) => {
    if(req.session){
        req.session.destroy((error) =>{
            if(error){
                console.log("-----------------------", error)
                return res.status(500).send("Error logging out")
            }
            res.redirect("/")
        })
    }
});

// Index route
router.get('/', (req,res) =>{
    res.render('index')
});

module.exports = router;